import express from "express"
import orderController from "../controller/orderController.js"
import authMiddleware from "../middleware/authMiddleware.js"

const orderRouter = express.Router()

orderRouter.post("/", authMiddleware.forAuthUser, orderController.placeOrder)
orderRouter.get("/", authMiddleware.forAuthUser, orderController.getOrders)
orderRouter.get("/:oid", authMiddleware.forAuthUser, orderController.getOrder)
orderRouter.put("/:oid", authMiddleware.forAuthUser, orderController.cancelOrder)

export default orderRouter