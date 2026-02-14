import express from "express"
import adminController from "../controller/adminController.js"
import authMiddleware from "../middleware/authMiddleware.js"
import upload from "../middleware/fileUploadMiddlleware.js"

const adminRouter = express.Router()

// for user
adminRouter.get("/users", authMiddleware.forAdmin, adminController.getAllUser)
adminRouter.put("/users/:uid", authMiddleware.forAdmin, adminController.updateUser)


// for product
adminRouter.post("/product/add", authMiddleware.forAdmin, upload.single("image"), adminController.addProduct)
adminRouter.put("/product/:pid", authMiddleware.forAdmin, adminController.updateProduct)


// for order
adminRouter.put("/orders/:oid", authMiddleware.forAdmin, adminController.updateOrder)
adminRouter.get("/orders", authMiddleware.forAdmin, adminController.getALlOrder)


// for review 

adminRouter.get("/reviews", authMiddleware.forAdmin, adminController.getALlReviews)

// For Coupon

adminRouter.post("/coupon/add", authMiddleware.forAdmin, adminController.createCoupon)
adminRouter.get("/coupon", authMiddleware.forAdmin, adminController.getCoupons)

export default adminRouter