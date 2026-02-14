import express from "express"
import productController from "../controller/productController.js"
import reviewRoutes from "./reviewRoutes.js"

const prodectRouter = express.Router({mergeParams: true}) 

prodectRouter.get("/", productController.getAllProdects)
prodectRouter.get("/:pid", productController.getProdect)

// review 

const addProductId = (req, res, next) => {
    req.product = req.params.pid
    next()
}

prodectRouter.use("/:pid/review", addProductId, reviewRoutes)

export default prodectRouter