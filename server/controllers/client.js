import Product from '../models/Product.js';  // so in this case this is different from the frontend. we do have to put .js . so make sure you add those
import ProductStat from '../models/ProductStat.js'

export const getProducts = async (req, res) => {
    try{
        const product = await Product.find();
        const productWithStat = await Promise.all(
            product.map(async (item) => {
                const stat = await ProductStat.find({
                    productId: item._id
                })
                return {
                    ...item._doc,
                    stat
                }
            })
        )
        res.status(200).json(productWithStat);
    }catch (error){
        res.status(400).json({
            message: error.message
        })
    }
    
}