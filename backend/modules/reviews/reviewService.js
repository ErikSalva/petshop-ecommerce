import db from "../../config/db.js"
import * as productRepository from '../products/productRepository.js'
import * as orderRepository from '../orders/orderRepository.js'
import * as reviewRepository from './reviewRepository.js'


export const postReview = async (productId, user, rating) =>{

    const productExists = await productRepository.getProductById(productId)
    if(!productExists) {
        throw new Error('El producto no existe')
    }

    // Verificar si el usuario ya ha calificado este producto
    const existingReview = await reviewRepository.getUserReviewForProduct(user.id, productId);
    if (existingReview) {
        throw new Error('Ya has calificado este producto');
    }

    // Verificar si el usuario ha comprado el producto
    const hasPurchased = await orderRepository.hasUserPurchasedProduct(user.id, productId);
    if (!hasPurchased) {
        throw new Error('Debes haber comprado este producto para calificarlo');
    }
    const transaction = await db.transaction()


    try {

        // Crear la reseña (solo con rating)
        const review = await reviewRepository.createReview({
            product_id: productId,
            user_id: user.id,
            rating: rating
        }, transaction);


        const stats = await reviewRepository.getProductRatingStats(productId, transaction);
        // Actualizar el rating promedio del producto
        await productRepository.updateProductById(productId, {
            average_rating: stats.avgRating || 0,
            total_reviews: stats.totalReviews || 0
        }, transaction);

        await transaction.commit()  
    } catch (error) {
        await transaction.rollback()
        throw error
    }
}

export const getReview = async (productId, user) =>{
    const productExists = await productRepository.getProductById(productId)
    if(!productExists) {
        throw new Error('El producto no existe')
    }

    const userReview = await reviewRepository.getUserReviewForProduct(user.id, productId);
    
    if (!userReview) {
        return null;
    }

    return {
        id: userReview.id,
        product_id: userReview.product_id,
        rating: userReview.rating,
    };
}