import express from "express"
import couponController from "../controller/couponController.js"
import authMiddleware from "../middleware/authMiddleware.js"

const couponRouter = express.Router() 

couponRouter.post("/", authMiddleware.forAuthUser,  couponController.applyCoupon)

export default couponRouter