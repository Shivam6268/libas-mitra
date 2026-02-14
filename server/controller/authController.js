import User from "../model/authModel.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const registerUser = async (req, res) => {
    const { name, email, phone, password, address } = req.body

    if (!name || !email || !phone || !password || !address) {
        res.status(409);
        throw new Error("Please Fill All Details");
    }

    const existEmail = await User.findOne({ email })
    const existPhone = await User.findOne({ phone })

    if (existEmail || existPhone) {
        res.status(400)
        throw new Error("User Already Exist")
    }

    if(phone.length !== 10){
        res.status(409)
        throw new Error("Please Fill Valid Number")
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = await User.create({ name, email, password: hashedPassword, phone, address })

    if (!user) {
        res.status(400)
        throw new Error("Registeration Faield")
    }
    else {
        
        res.status(200)
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            isAdmin : user.isAdmin,
            credits : user.credits,
            token : generateToken(user.id)
        })
    }

}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(409)
        throw new Error("Please Fill All Details")
    }

    const user = await User.findOne({ email })

    if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
            isAdmin : user.isAdmin,
            credits : user.credits,
            token : generateToken(user.id)
        })
    }
    else{
        res.status(400)
        throw new Error("Invalid User")
    }


}


// generate token 

const generateToken = (id) => {
    let token = jwt.sign({id}, process.env.JWT_SECRET);

    return token
}

const authController = {
    registerUser, loginUser
}


export default authController