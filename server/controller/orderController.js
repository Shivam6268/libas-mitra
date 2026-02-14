import Cart from "../model/cartModel.js"
import Coupon from "../model/couponModel.js"
import Order from "../model/orderModel.js"

const placeOrder = async (req, res) => {

    const userId = req.user._id
    const { shippingAddress } = req.body


    if (!shippingAddress) {
        res.status(409)
        throw new Error("Please Provide The Shipping Address")
    }

    let couponCode = await Coupon.findOne({ couponCode: req.body?.coupon })

    // Find Cart 

    const cart = await Cart.findOne({ user: userId }).populate("products.product")

    if (!cart) {
        res.status(404)
        throw new Error("Cart Not Found")
    }


    let totleBill = cart.products.reduce((acc, product) => {
        return acc + product.product.salePrice * product.qty
    }, 0)


    // Apply Coupon Discount
    totleBill = couponCode ? totleBill - (totleBill * couponCode.couponDiscount / 100) : totleBill


    const order = new Order({
        user: userId,
        products: cart.products,
        totalBillAmount: totleBill,
        isDescounted: couponCode ? true : false,
        coupon: couponCode ? couponCode._id : null,
        shippingAddress: shippingAddress
    })

    await order.save()

    if (!order) {
        res.status(409)
        throw new Error("Order Not Created")
    }

    await cart.deleteOne()

    res.status(201).json(order)



}


const cancelOrder = async (req, res) => {
    const orderId = req.params.oid

    const myOrder = await Order.findById(orderId).populate('products.product').populate('user')

    if (!myOrder) {
        res.status(404)
        throw new Error('Order Not Found!')
    }

    if (myOrder.status === "placed") {

        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status: "cancelled" }, { new: true })

        if (!updatedOrder) {
            res.status(409)
            throw new Error("Order Cannot Be Cancelled!")
        }

        res.status(200).json({
            message: "Order Cancelled",
            updatedOrder
        })
    } else {
        res.status(409)
        throw new Error("Order Cannot Be Cancelled!")
    }
}

const getOrders = async (req, res) => {

    const userId = req.user._id

    const myOrders = await Order.find({ user: userId }).populate("products.product").populate("user")

    if (!myOrders) {
        res.status(404)
        throw new Error("Orders Not Found")
    }

    res.status(200).json(myOrders)
}
const getOrder = async (req, res) => {

    const orderId = req.params.oid

    const myOrder = await Order.findById(orderId).populate("products.product").populate("user")

    if (!myOrder) {
        res.status(404)
        throw new Error("Order Not Found")
    }

    res.status(200).json(myOrder)
}

const orderController = { placeOrder, cancelOrder, getOrder, getOrders }

export default orderController