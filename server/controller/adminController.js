
import fs from "node:fs"
import User from "../model/authModel.js"
import Order from "../model/orderModel.js"
import Review from "../model/reviewModel.js"
import Product from "../model/productModel.js"
import Coupon from "../model/couponModel.js"
import uploadToCloudinary from "../middleware/cloudinaryMiddleware.js"

const getAllUser = async (req, res) => {
    let users = await User.find()

    if (!users) {
        res.status(404)
        throw new Error("Users Not Found")
    }
    else {
        res.status(200).json(users)
    }
}


const updateUser = async (req, res) => {
    const userId = req.params.uid

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true })

    if (!updatedUser) {
        res.status(409)
        throw new Error("User Not Updated")
    }

    res.status(200).json(updatedUser)


}


const addProduct = async (req, res) => {


    try {
        const { name, description, orignalPrice, salePrice, size, category, stock } = req.body

        if (!name || !description || !orignalPrice || !salePrice || !size || !category || !stock) {
            res.status(400)
            throw new Error("Please Fill All Details")
        }

        // upload to cloudinary

        let imagePath = await uploadToCloudinary(req.file.path)

        // remove image from our image
        fs.unlinkSync(req.file.path)

        // clounary operation is pending
        const product = await Product.create({
            name, description, orignalPrice, salePrice, size, stock, category, image: imagePath.secure_url
        })

        if (!product) {
            res.status(409)
            throw new Error("Product Not Created")
        } else {
            res.status(200).json(product)
        }

    } catch (error) {
        fs.unlinkSync(req?.file?.path)
        res.status(500)
        throw new Error("Product Not Created")
    }

}

const updateProduct = async (req, res) => {
    const product = await Product.findById(req.params.pid)

    if (!product) {
        res.status(404)
        throw new Error("Product Not Found")
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.pid, req.body, { new: true })

    if (!product) {
        res.status(409)
        throw new Error("Product Not Updated")
    }
    else {
        res.status(200).json(updatedProduct)
    }

}

const updateOrder = async (req, res) => {

    const orderId = req.params.oid
    const { status } = req.body


    const myOrder = await Order.findById(orderId).populate("products.product").populate("user")


    if (!myOrder) {
        res.status(404)
        throw new Error("Order Not Found")
    }

    // stock updation 

    const updateStock = async (productId, updatedStock) => {
        await Product.findByIdAndUpdate(productId, { stock: updatedStock })
    }


    let updatedOrder

    if (status === "dispatched") {

        // Update Stock
        myOrder.products.forEach((item) => {
            let productId = item.product._id
            let productStock = item.product.stock
            updateStock(productId, productStock - item.qty)
        })

        updatedOrder = await Order.findByIdAndUpdate(orderId, { status: "dispatched" }, { new: true }).populate("products.product")
    } else if (status === "delivered") {
        updatedOrder = await Order.findByIdAndUpdate(orderId, { status: "delivered" }, { new: true })
    } else if (status === "cancelled") {
        if (myOrder.status === "dispatched") {
            res.status(409)
            throw new Error("Order is already dispatched")
        } else {
            updatedOrder = await Order.findByIdAndUpdate(orderId, { status: "cancelled" }, { new: true })
        }

    }



    if (!updatedOrder) {
        res.status(409)
        throw new Error("Order Cannot Be Cancelled!")
    }

    res.status(201).json(updatedOrder)


}


const getALlOrder = async (req, res) => {
    const orders = await Order.find().populate("products.product").populate('user')

    if (!orders) {
        res.status(400)
        throw new Error("Orders Not Found")
    }
    else {
        res.status(200).json(orders)
    }


}

const getALlReviews = async (req, res) => {
    const reviews = await Review.find().populate("product").populate("user")

    if (!reviews) {
        res.status(400)
        throw new Error("Reviews Not Found")
    }
    else {
        res.status(200).json(reviews)
    }

}

const createCoupon = async (req, res) => {

    const { couponCode, couponDiscount } = req.body

    if (!couponCode) {
        res.status(409)
        throw new Error("Please Type Coupon")
    }

    const newCoupon = await Coupon.create({ couponCode: couponCode.toUpperCase(), couponDiscount })

    if (!newCoupon) {
        res.status(409)
        throw new Error("Coupon Not Found")
    }

    res.status(201).json(newCoupon)
}

const getCoupons = async(req, res) => {
    const coupons = await Coupon.find() 

    if(!coupons){
        res.status(409)
        throw new Error("Coupons Not Found")
    }

    res.status(200).json(coupons)

}

const adminController = { getAllUser, addProduct, updateProduct, updateOrder, getALlOrder, getALlReviews, createCoupon, getCoupons, updateUser }

export default adminController