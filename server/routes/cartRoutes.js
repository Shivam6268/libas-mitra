import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import cartController from "../controller/cartController.js"

const cartRouter = express.Router() 

cartRouter.get("/", authMiddleware.forAuthUser, cartController.getCart)
cartRouter.post("/", authMiddleware.forAuthUser, cartController.addCart)
cartRouter.post("/clear", authMiddleware.forAuthUser, cartController.clearCart)
cartRouter.put("/", authMiddleware.forAuthUser, cartController.updateCart)
cartRouter.delete("/:productId", authMiddleware.forAuthUser, cartController.removeCart)

export default cartRouter