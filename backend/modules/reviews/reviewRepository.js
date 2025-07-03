import { Review } from "../../models/index.js";
import { fn, col } from 'sequelize';

export const createReview = async (reviewData, transaction) => {
    return await Review.create(reviewData, {transaction});
}

export const getUserReviewForProduct = async (userId, productId) => {
    return await Review.findOne({ 
        where: { 
            user_id: userId, 
            product_id: productId 
        } 
    });
};


export const getProductRatingStats = async (productId, transaction = null) => {
    return await Review.findOne({
        attributes: [
            [fn('AVG', col('rating')), 'avgRating'],
            [fn('COUNT', col('id')), 'totalReviews']
        ],
        where: { product_id: productId },
        transaction,
        raw: true
    });
}