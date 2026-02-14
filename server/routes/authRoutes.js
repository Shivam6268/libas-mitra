import express, { Router } from "express"
import authController from "../controller/authController.js"
const  authRouter = express.Router() 

const {registerUser, loginUser} = authController


authRouter.post("/register", registerUser)
authRouter.post("/login", loginUser)


export default authRouter