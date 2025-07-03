import * as reviewService from './reviewService.js'


const postReview = async (req, res, next) =>{

    try {
        const {productId} = req.params
        const { rating } = req.body

        const review = await reviewService.postReview(productId, req.user, rating)
                
        if (!review) {
            return res.status(200).json({
                exists: false,
                message: "No has calificado este producto"
            });
        }
        
        res.status(200).json({
            exists: true,
            data: review
        });
    } catch (error) {
        next(error)
    }

}


const getReview = async (req, res, next) =>{
    const {productId} = req.params
    try {
        const review = await reviewService.getReview(productId, req.user)
        res.status(201).json(review)
    } catch (error) {
        next(error)
    }
}
export{
    postReview,
    getReview
}