import { Order, OrderItem, OrderStatus, Variant, Product, PetType, Image} from "../../models/index.js"
import { Op } from "sequelize"

export const getVariantById = async (variantId, transaction) => {
    return await Variant.findByPk(variantId, {include: [{ model: Product }], transaction})
}


export const getOrderByUserIdAndStatusId = async(id, stateId, transaction = null) => {
    return await Order.findOne({
        where:{
            user_id: id,
            status_id: stateId
        },
        transaction
    },)
} 

export const createOrder = async (data, transaction) =>{

    return await Order.create(data, {transaction})
}

export const getProductByVariantId = async (variantId, transaction) => {
    // Busco la variante para obtener el product_id
    const variant = await Variant.findOne({ where: { id: variantId }, transaction });
    if (!variant) return null;

    // Ahora busco el producto con imágenes ordenadas
    const product = await Product.findOne({
      where: { id: variant.product_id },
      transaction
    });

    return product;
}

export const createOrderItem = async (data, transaction) => {
    await OrderItem.create(data, {transaction})
}

export const getPetTypeByProductId = async (id, transaction) =>{
    const product = await Product.findOne({
        where: {id},
        include: {
        model: PetType,
        attributes: ['id', 'name']
        },
        attributes: [], // Para no traer campos del producto
        transaction
    });

    if (!product) return null;

    return product.pet_type;

}

export const updateOrder =async (orderId, data, transaction) =>{
    return await Order.update(data, {
        where:{
            id: orderId
        },
        transaction
    })
}

// Busca un ítem del carrito según order_id y variant_id
export const getOrderItemByOrderIdAndVariantId = async (orderId, variantId, transaction) => {
  return await OrderItem.findOne({
    where: {
      order_id: orderId,
      variant_id: variantId
    },
    transaction
  });
}

export const getOrderItemsByOrderId = async (orderId, transaction) => {
  return await OrderItem.findAll({
    where: { order_id: orderId },
    include: [
      {
        model: Variant,
        include: [
          {
            model: Product,
            attributes: ['id', 'slug'],
            include: [
              {
                model: Image,
                attributes: ['filename'],
                order: [['order', 'ASC']], // Ordenar por campo 'order' ascendente
                limit: 1 // Solo la primera imagen según el orden
              }
            ]
          }
        ]
      }
    ],
    transaction
  });
};

export const updateOrderItem = async (orderItemId, data, transaction) => {
  return await OrderItem.update(data, {
    where: { id: orderItemId },
    transaction
  });
}

export const getOrderItemById = async(id) =>{
    return await OrderItem.findByPk(id)
}

export const deleteOrderItemById = async (id, transaction)=>{
    await OrderItem.destroy({
        where: { id },
        transaction
    });
}

export const getOrderById = async (id) => {
   return await Order.findByPk(id, {
    include: {
      model: OrderStatus,
      attributes: ['name'] 
      
    }
  });
};

export const getOrderByIdWithLock = async (id, transaction) => {
  return await Order.findByPk(id, {
    include: {
      model: OrderStatus,
      attributes: ['code']
    },
    lock: transaction.LOCK.UPDATE, 
    transaction
  });
};



export const getStatusByName = async (statusName, transaction) => {
  return await OrderStatus.findOne({ 
    where: { 
        code: statusName 
    }, 
    transaction });
};




export const incrementVariantStock = async (variantId, quantity, transaction = null) => {
    return await Variant.increment('stock', {
        by: quantity,
        where: { id: variantId },
        transaction
    });
};

export const decrementVariantStock = async (variantId, quantity, transaction = null) => {
    return await Variant.decrement('stock', {
        by: quantity,
        where: { id: variantId },
        transaction
    });
};

export const getOrdersWithItemsByUserId = async (userId, excludeStatuses = []) => {
  const whereClause = { user_id: userId };

  if (excludeStatuses.length > 0) {
    whereClause.status_id = { [Op.notIn]: excludeStatuses };
  }
  
  return await Order.findAll({
    where: whereClause,
    attributes: ['total_price', 'createdAt'],
    include: [
      { model: OrderStatus, attributes: ['code', 'description'] },
      { 
        model: OrderItem, 
        attributes: ['product_title', 'quantity', 'subtotal', 'variant_weight', 'unit_price', 'pet_type_name'],
        include: [
          { model: Variant,
            attributes: ['product_id']

          }
        ]
      }
    ],
    order: [['createdAt', 'DESC']]
  });
};

export const  getAllOrders = async (excludeStatuses = []) => {
  const whereClause = {}
  if (excludeStatuses.length > 0) {
    whereClause.status_id = { [Op.notIn]: excludeStatuses };
  }
  return await Order.findAll({
    where: whereClause,
    include: [
      { model: OrderStatus, attributes: ['code', 'description'] },
      { model: OrderItem, attributes: ['product_title', 'quantity', 'subtotal', 'variant_weight', 'unit_price', 'pet_type_name'] }
    ],
    order: [['createdAt', 'DESC']]
  });

}

export const getOrderItemsWithLock = async (orderId, transaction) => {
    return await OrderItem.findAll({
        where: { order_id: orderId },
        include: [{
            model: Variant,
            include: [Product]
        }],
        lock: transaction.LOCK.UPDATE, // Bloqueo para evitar cambios concurrentes
        transaction
    });
};


export async function getVariantsByIdsWithLock(variantIds, transaction) {
  return await Variant.findAll({
    where: {
      id: variantIds
    },
    transaction,
    lock: transaction.LOCK.UPDATE,
    include: [{ model: Product }]
  });
}


export async function getVariantByIdWithLock(id, transaction) {
  return await Variant.findByPk(id, {
    transaction,
    lock: transaction.LOCK.UPDATE,
    include: [{ model: Product }]
  });
}




export const hasUserPurchasedProduct = async (user_id, product_id) => {
    const confirmedStatus = await OrderStatus.findOne({ 
        where: { code: 'confirmed' } 
    });
    
    if (!confirmedStatus) return false;
    
    const count = await Order.count({
        where: { 
            user_id,
            status_id: confirmedStatus.id
        },
        include: [{
            model: OrderItem,
            include: [{
                model: Variant,
                where: { product_id },
                required: true
            }],
            required: true
        }]
    });
    
    return count > 0;
};