import jwt from "jsonwebtoken"
import User from "../model/authModel.js"

const forAuthUser = async (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

            let token = req.headers.authorization.split(" ")[1]
            let decoded = jwt.verify(token, process.env.JWT_SECRET)
            let user = await User.findById(decoded.id).select("-password")
            req.user = user
            next()
        }
        else {
            res.status(400)
            throw new Error("UnAuthorize Access, Need For Valid Access")
        }

    } catch (error) {
        res.status(400)
        throw new Error("UnAuthorize Access, Need For Valid Access")
    }

}


const forAdmin = async (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

            let token = req.headers.authorization.split(" ")[1]
            let decoded = jwt.verify(token, process.env.JWT_SECRET)
            let user = await User.findById(decoded.id).select("-password")
            if(user.isAdmin){
                req.user = user
            next()
            }
            else{
                 res.status(400)
                throw new Error("UnAuthorize Access, Admin Access Only")
            }
        }
        else {
            res.status(400)
            throw new Error("UnAuthorize Access,  Valid Token Needed")
        }

    } catch (error) {
        res.status(400)
        throw new Error("UnAuthorize Access, Valid Token Needed")
    }

}


const authMiddleware = { forAuthUser, forAdmin }

export default authMiddleware