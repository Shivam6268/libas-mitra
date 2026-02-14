import  mongoose  from "mongoose";

const couponSchema = new mongoose.Schema({
       couponCode : {
        type: String,
        unique: true,
        required: [true, "Please Enter Coupon" ]
       },
       couponDiscount: {
        type: Number,
        required: [true, "Please Enter % Of Coupon" ]
       },
       isActive: {
        type: Boolean,
        required: true,
        default: true
       }
},{
    timestamps: true
})


const Coupon = mongoose.model("Coupon", couponSchema)

export default Coupon