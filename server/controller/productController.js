import Product from "../model/productModel.js"

const getAllProdects = async (req, res) => {
    const products = await Product.find()

    if(!products){
        res.status(400)
        throw new Error("Products Not Found")
    }else{
        res.status(200).json(products)
    }
}

const getProdect = async (req, res) => {
     const product = await Product.findById(req.params.pid)

    if(!product){
        res.status(400)
        throw new Error("Product Not Found")
    }else{
        res.status(200).json(product)
    }
}

const productController = {getAllProdects, getProdect}

export default productController