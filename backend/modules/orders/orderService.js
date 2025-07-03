import * as orderRepository from './orderRepository.js'
import db from '../../config/db.js'
import getFormattedWeight from './helpers/helpers.js'


// veifica ue este activo falta eso, lo de cofnirmed ya no
export const addItemToCart = async (body, user) =>{
    

    // items es un objeto que tiene 
    //{variant_id, quantity}
    const {variant_id, quantity} = body

    const transaction = await db.transaction()

    const {id} = user
    try {

        // Obtener variante CON el producto asociado
        const variant = await orderRepository.getVariantByIdWithLock(variant_id, transaction);


        // Validaciones combinadas
        if (!variant) throw new Error('La variante no existe');
        if (!variant.product.is_active) throw new Error('Producto no disponible actualmente');
        if (variant.stock < quantity) throw new Error('Stock insuficiente');


        // Busca en que el usuario tenga un carrito si no lo tiene lo crea
        const cartState = await orderRepository.getStatusByName('cart', transaction)
         
        let cartOrder = await orderRepository.getOrderByUserIdAndStatusId(id, cartState.id, transaction)

        if(!cartOrder){
            cartOrder = await orderRepository.createOrder({
                user_id: id, 
                status_id: cartState.id
            }, transaction)
        }

        // Buscar si ya existe item para esta variante en el carrito
        const existingItem = await orderRepository.getOrderItemByOrderIdAndVariantId(cartOrder.id, variant.id, transaction);
        if (existingItem) {
            // Actualizar cantidad, precio unitario y subtotal con los valores ACTUALES
            const newQuantity = existingItem.quantity + quantity;

            if (variant.stock < newQuantity) {
                throw Error('Stock insuficiente');
            }

            // Siempre usar el precio ACTUAL de la variante
            const newSubtotal = newQuantity * parseFloat(variant.price);
            const product = await orderRepository.getProductByVariantId(variant.id, transaction);
            const petTypeProduct = await orderRepository.getPetTypeByProductId(product.id, transaction);

            await orderRepository.updateOrderItem(existingItem.id, {
                quantity: newQuantity,
                unit_price: variant.price, // Actualizar precio unitario
                subtotal: newSubtotal,
                product_title: product.title, // También actualizar otros datos por si cambiaron
                pet_type_name: petTypeProduct?.name || null,
                variant_weight: getFormattedWeight(variant)
            }, transaction);
        } else {

            // Crear nuevo item en el carrito
            const newSubtotal = quantity * parseFloat(variant.price);
            const product = await orderRepository.getProductByVariantId(variant.id, transaction);
            const petTypeProduct = await orderRepository.getPetTypeByProductId(product.id, transaction);

            await orderRepository.createOrderItem({
                order_id: cartOrder.id,
                variant_id: variant.id,
                quantity,
                subtotal: newSubtotal,
                product_title: product.title,
                variant_weight: getFormattedWeight(variant),
                unit_price: variant.price,
                pet_type_name: petTypeProduct?.name || null,
            }, transaction);
        }

        //const total = (cartOrder.total_price || 0) + newSubtotal
        const allItems = await orderRepository.getOrderItemsByOrderId(cartOrder.id, transaction);
        const total = allItems.reduce((acc, item) => acc + parseFloat(item.subtotal), 0);

        await orderRepository.updateOrder(cartOrder.id, {
            total_price: total
        }, transaction)
        
        await transaction.commit()
    } catch (error) {
        await transaction.rollback()
        throw error
    }
    
}

export const updateCartItem = async (body, user, itemId) =>{
    const { quantity } = body
    
    const transaction = await db.transaction();
    
    try {
        // Obtener el ítem del carrito dentro de la transacción
        const orderItem = await orderRepository.getOrderItemById(itemId, transaction);
        if (!orderItem) {
            throw Error('El item no existe');
        }

        // Obtener la variante actual dentro de la misma transacción
        const variant = await orderRepository.getVariantByIdWithLock(orderItem.variant_id, transaction);
        if (!variant) {
            throw Error('La variante no existe');
        }

        if ((variant.stock - quantity) < 0) {
            throw Error('Stock insuficiente');
        }
        if (!variant.product.is_active) throw new Error('Producto no disponible actualmente');

        // Verificar permisos
        const cartState = await orderRepository.getStatusByName('cart', transaction);
        const cartOrder = await orderRepository.getOrderByUserIdAndStatusId(user.id, cartState.id, transaction);
        if (orderItem.order_id !== cartOrder.id) {
            throw Error('No tenés permiso para modificar este ítem');
        }

        // Porque puede pasar que el admin actualice justo cuando el user esta editando la cantidad
        
        // Calcular subtotal con el precio ACTUAL de la variante
        const subtotal = quantity * parseFloat(variant.price);
        const product = await orderRepository.getProductByVariantId(variant.id, transaction);
        const petTypeProduct = await orderRepository.getPetTypeByProductId(product.id, transaction);

        // Actualizar TODOS los campos relevantes del ítem
        await orderRepository.updateOrderItem(
            orderItem.id,
            {
                quantity: quantity,
                unit_price: variant.price, // Actualizar precio
                subtotal: subtotal,
                product_title: product.title, // Actualizar otros datos
                pet_type_name: petTypeProduct?.name || null,
                variant_weight: getFormattedWeight(variant)
            },
            transaction
        );

        // Recalcular total del carrito
        const allItems = await orderRepository.getOrderItemsByOrderId(cartOrder.id, transaction);
        const total = allItems.reduce((acc, item) => acc + parseFloat(item.subtotal), 0);
        await orderRepository.updateOrder(
            cartOrder.id,
            { total_price: total },
            transaction
        );

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};





export const deleteCartItem = async (itemId, user) =>{

    const {id} = user
    const transaction = await db.transaction()
    try {

        // Verificar existencia del item dentro de la transacción
        const orderItem = await orderRepository.getOrderItemById(itemId, transaction);
        if (!orderItem) {
            throw new Error('El item no existe');
        }

        // Obtener variante con LOCK dentro de la misma transacción
        const variant = await orderRepository.getVariantByIdWithLock(orderItem.variant_id, transaction);
        if (!variant) {
            throw new Error('La variante no existe');
        }
        const cartState = await orderRepository.getStatusByName('cart', transaction)
        const cartOrder = await orderRepository.getOrderByUserIdAndStatusId(id, cartState.id, transaction)
        if (orderItem.order_id !== cartOrder.id) {
            throw Error('No tenés permiso para modificar este ítem');
        }

        await orderRepository.deleteOrderItemById(orderItem.id, transaction)

        const allItems = await orderRepository.getOrderItemsByOrderId(cartOrder.id, transaction);
        const total = allItems.reduce((acc, item) => acc + parseFloat(item.subtotal), 0);

        await orderRepository.updateOrder(cartOrder.id, {
        total_price: total
        }, transaction);

        

        await transaction.commit()
    } catch (error) {
        await transaction.rollback()
        throw error
    }

}

export const getCartItems = async(user) => {

    const cartState = await orderRepository.getStatusByName('cart')

    if (!cartState) throw new Error('Estado de carrito no encontrado');

    const cartOrder = await orderRepository.getOrderByUserIdAndStatusId(user.id, cartState.id)

    if (!cartOrder) return {cart_id: null, items: [], total_price: 0 };
    

    const transaction = await db.transaction();
    try {
        const allItems = await orderRepository.getOrderItemsByOrderId(cartOrder.id, transaction);
        // Convertir a JSON plano y mostrar de forma legible

        const updatedItems = await Promise.all(
            allItems.map(async (item) => {
                const currentVariant = await orderRepository.getVariantByIdWithLock(item.variant_id, transaction);
                
                // Verificar eliminación, stock Y estado activo
                if (!currentVariant || currentVariant.stock <= 0 || !currentVariant.product.is_active) {
                    await orderRepository.deleteOrderItemById(item.id, transaction);
                    return null;
                }

                // Actualizar si hay cambios en precio/peso
                const needsUpdate = 
                    parseFloat(item.unit_price) !== parseFloat(currentVariant.price) || 
                    item.variant_weight !== getFormattedWeight(currentVariant);

                if (needsUpdate) {
                    const subtotal = item.quantity * parseFloat(currentVariant.price);
                    const product = await orderRepository.getProductByVariantId(currentVariant.id, transaction);
                    const petTypeProduct = await orderRepository.getPetTypeByProductId(product.id, transaction);

                    const updatedData = {
                        unit_price: currentVariant.price,
                        subtotal: subtotal,
                        variant_weight: getFormattedWeight(currentVariant),
                        product_title: product.title,
                        pet_type_name: petTypeProduct?.name || null,
                    };

                    await orderRepository.updateOrderItem(
                        item.id,
                        updatedData,
                        transaction
                    );

                    return { ...item, ...updatedData };
                }

                return item;
            })
        );

        // Filtrar ítems eliminados (nulls)
        const validItems = updatedItems.filter(item => item !== null);
        
        // Recalcular total
        const total = validItems.reduce((acc, item) => acc + parseFloat(item.subtotal), 0);
        await orderRepository.updateOrder(
            cartOrder.id,
            { total_price: total },
            transaction
        );

        await transaction.commit();

        return {
            cart_id: cartOrder.id,
            items: validItems,
            total_price: total,
        };
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};


export const updateOrderStatus = async (user, orderId, newStatus) => {
    const roleAllowedTransitions = {
        user: ['confirmed'],
        admin: ['cancelled', 'delivered', 'confirmed']
    };

    const allowedTransitions = {
        cart: ['confirmed'],
        confirmed: ['delivered', 'cancelled'],
        delivered: [],
        cancelled: []
    };

    const transaction = await db.transaction();
    try {
        // Obtener orden con LOCK para evitar condiciones de carrera
        const order = await orderRepository.getOrderByIdWithLock(orderId, transaction);

        if (!order) {
            await transaction.rollback();
            throw new Error('Orden no encontrada');
        }

        const isOwner = order.user_id === user.id;
        const isAdmin = user.role === 'admin';
        if (!isOwner && !isAdmin) {
            await transaction.rollback();
            throw new Error('No tenés permisos para modificar esta orden');
        }

        // Validar si el rol puede hacer la transición solicitada
        const allowedStatuses = roleAllowedTransitions[user.role] || [];
        if (!allowedStatuses.includes(newStatus)) {
            await transaction.rollback();
            throw new Error(`Tu rol (${user.role}) no puede cambiar a estado ${newStatus}`);
        }

        // Estado actual (como string) viene del include en getOrderById
        const currentStatus = order.order_status?.code;
        
        if (!currentStatus) {
            await transaction.rollback();
            throw new Error('Estado actual del pedido no disponible');
        }

        const validNextStates = allowedTransitions[currentStatus] || [];
        if (!validNextStates.includes(newStatus)) {
            await transaction.rollback();
            throw new Error(`No se puede pasar de ${currentStatus} a ${newStatus}`);
        }

        // Buscar el ID real del nuevo estado
        const statusRecord = await orderRepository.getStatusByName(newStatus);
        if (!statusRecord) {
            await transaction.rollback();
            throw new Error(`Estado "${newStatus}" no encontrado`);
        }

        // Obtener todos los ítems del pedido con LOCK
        const orderItems = await orderRepository.getOrderItemsWithLock(orderId, transaction);

        // Obtener todas las variantes necesarias en una sola consulta con LOCK
        const variantIds = orderItems.map(item => item.variant_id);
        const variants = await orderRepository.getVariantsByIdsWithLock(variantIds, transaction);
        const variantMap = new Map(variants.map(v => [v.id, v]));

        // Manejo especial para transición a "confirmed"
        if (newStatus === 'confirmed') {
            const changes = [];
            let needsUserConfirmation = false;
            
            // Verificar cada ítem
            for (const item of orderItems) {
                const variant = variantMap.get(item.variant_id);
                
                // Caso 1: Producto eliminado
                if (!variant) {
                    await transaction.rollback();
                    throw new Error(`El producto "${item.product_title}" ya no está disponible. Por favor actualiza tu carrito.`);
                }
                if (!variant.product.is_active) {
                    await transaction.rollback();
                    throw new Error(`El producto "${item.product_title}" ha sido desactivado y no puede comprarse`);
                } 
                                
                // Caso 2: Stock insuficiente
                if (variant.stock < item.quantity) {
                    await transaction.rollback();
                    throw new Error(`Stock insuficiente para "${item.product_title}" (Solicitado: ${item.quantity}, Disponible: ${variant.stock})`);
                }
                
                // Caso 3: Precio modificado
                if (parseFloat(item.unit_price) !== parseFloat(variant.price)) {
                    needsUserConfirmation = true;
                    changes.push({
                        itemId: item.id,
                        product: item.product_title,
                        oldPrice: item.unit_price,
                        newPrice: variant.price,
                        action: 'price_update'
                    });
                }
            }

            // Si hay cambios importantes que requieren confirmación
            if (needsUserConfirmation) {
                await transaction.rollback();
                return {
                    needsConfirmation: true,
                    changes: changes,
                    message: "Algunos precios han cambiado. Por favor revisa antes de confirmar el pago."
                };
            }

            // Si todo está bien, procesar el pago
            for (const item of orderItems) {
                const variant = variantMap.get(item.variant_id);
                await orderRepository.decrementVariantStock(
                    item.variant_id, 
                    item.quantity,
                    transaction
                );
                
                // Actualizar datos del ítem con información actual
                await orderRepository.updateOrderItem(
                    item.id,
                    {
                        unit_price: variant.price,
                        product_title: variant.product.title,
                        variant_weight: getFormattedWeight(variant)
                    },
                    transaction
                );
            }
        }
        
        // Manejo especial para cancelación de pedido pagado
        if (newStatus === 'cancelled' && currentStatus === 'confirmed') {
            // Reintegrar stock
            for (const item of orderItems) {
                await orderRepository.incrementVariantStock(
                    item.variant_id, 
                    item.quantity,
                    transaction
                );
            }
        }

        // Actualizar estado del pedido
        await orderRepository.updateOrder(
            orderId, 
            { status_id: statusRecord.id },
            transaction
        );

        await transaction.commit();
        return { success: true };
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

export const getOrders = async(user) =>{
    
    const cartState = await orderRepository.getStatusByName('cart')

    if (!cartState) throw new Error('Estados no encontrados');

    const orders = await orderRepository.getOrdersWithItemsByUserId(user.id, [cartState.id]);

    return orders || []

}

export const getAllOrders = async(user) =>{
    
    const cartState = await orderRepository.getStatusByName('cart')

    if (!cartState) throw new Error('Estados no encontrados');

    const orders = await orderRepository.getAllOrders([cartState.id]);

    return orders || []

}
