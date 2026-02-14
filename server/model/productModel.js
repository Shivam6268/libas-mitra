import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    orignalPrice: {
        type: Number,
        required: true
    },
    category : {
        type: String,
        required: true
    },
    salePrice: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    size: {
        type: String,
        enum: ["sm", "md", "lg", "xl", "2xl", "3xl"],
        required: true
    }
},
    {
        timestamps: true
    })


const Product = mongoose.model("Product", productSchema)

export default Product