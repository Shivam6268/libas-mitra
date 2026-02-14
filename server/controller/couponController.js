
import Coupon from "../model/couponModel.js"

const applyCoupon =  async (req, res) => {

    if(!req.body.couponCode){
        res.status(409)
        throw new Error("Please Enter Coupon")
    }

    const coupon = await Coupon.findOne({couponCode: req.body.couponCode})

    if(!coupon){
        res.status(404)
        throw new Error("Invalid Coupon Code")
    }


    res.status(200).json(coupon)
}

const couponController = {applyCoupon}

export default couponController