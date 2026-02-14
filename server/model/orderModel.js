import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            qty: {
                type: Number,
                required: true,
                min: [1, "Quantity cannot be less than 1"],
                default: 1
            },
            _id: false
        }
    ],
    totalBillAmount: {
        type: Number,
        required: true
    },
    isDescounted: {
        type: Boolean,
        required: true,
    },

    coupan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Coupan"
    },
    status: {
        type: String,
        enum: ["placed", "despatched", "cancelled", "delivered"],
        default: "placed",
        required: true
    },
    shippingAddress : {
        type: String,
        required: [true, "Please Enter Shipping Address "]
    }
},
    {
        timestamps: true
    })


const Order = mongoose.model("Order", orderSchema)

export default Order