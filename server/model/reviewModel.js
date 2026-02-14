import mongoose from "mongoose";

const reveiwShema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    rating: {
        type: Number,
        default: 1,
        required: true
    },
    text: {
        type: String,
        required: [true, "Please Enter Your Review"]
    },
    isVerifiedBuyer: {
        type: Boolean,
        default: false,
        required: true
    }
},
    {
        timestamps: true
    })


const Review = mongoose.model("Review", reveiwShema)

export default Review