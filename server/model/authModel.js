import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter Your Name"]
    },
    email: {
        type: String,
        required: [true, "Enter Your Email"],
        unique: true
    },
    phone: {
        type: Number,
        required: [true, "Enter Your Phone"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Enter Your Password"]
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    address: {
        type: String,
        required: [true, "Enter Your Address"]
    },
    credits: {
        type: Number,
        default : 5,
        required: true
    }
}, {
    timestamps: true
})


let User = mongoose.model("User", authSchema)

export default User