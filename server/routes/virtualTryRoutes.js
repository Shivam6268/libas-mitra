import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import { virtualTry } from "../controller/virtualTryController.js"
import upload from "../middleware/fileUploadMiddlleware.js"

const virtulTryRouter = express() 

virtulTryRouter.post("/", authMiddleware.forAuthUser,  upload.single('person_url'),  virtualTry)

export default virtulTryRouter