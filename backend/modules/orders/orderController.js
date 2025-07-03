
import * as orderService from './orderService.js'


const addItemToCart = async (req, res, next) =>{

    try {
        await orderService.addItemToCart(req.body, req.user)
        res.status(201).json('Item agregado con exito');
    } catch (error) {
        next(error)
    }

}

const updateCartItem = async (req, res, next) =>{
    const { itemId } = req.params
    try {
        await orderService.updateCartItem(req.body, req.user, itemId)
        res.status(201).json('Item actualizado con exito');
    } catch (error) {
        next(error)
    }
} 


const deleteCartItem = async (req, res, next) =>{
    const { itemId } = req.params
    try {
        await orderService.deleteCartItem(itemId, req.user)
        res.status(201).json('Item eliminado con exito');
    } catch (error) {
        next(error)
    }
}


const getCartItems = async (req, res, next) =>{
    try {
        const cart = await orderService.getCartItems(req.user)
        res.json(cart)
    } catch (error) {
        next(error)
    }
}

const updateOrderStatus = async(req, res, next) =>{
    const { id } = req.params
    const { status } = req.body;

    try {
        await orderService.updateOrderStatus(req.user, id, status)
        res.status(201).json('Cambio de estado realizado con exito');
    } catch (error) {
        next(error)
    }

}

const getOrders = async (req, res, next) =>{

    try {
        const orders = await orderService.getOrders(req.user)
        res.json(orders)
    } catch (error) {
        next(error)
    }
}

const getAllOrders = async(req, res, next) => {
    try {
        const orders = await orderService.getAllOrders(req.user)
        res.json(orders)
    } catch (error) {
        next(error)
    }
}

export {
    addItemToCart,
    updateCartItem,
    deleteCartItem,
    getCartItems,
    updateOrderStatus,
    getOrders,
    getAllOrders
}