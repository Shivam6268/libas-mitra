import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
import fs from "node:fs"

dotenv.config();

console.log("key", process.env.CLOUDINARY_API_KEY)

// Configuration
cloudinary.config({
    cloud_name: 'ddusfoh0u',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadToCloudinary = async (fileLink) => {

    // Upload an image
    const uploadResult = await cloudinary.uploader
        .upload(fileLink, {
            resource_type: "auto"
        })
        .catch((error) => {
            console.log(error);
            fs.unlinkSync(fileLink)
        });


    return uploadResult

};


export default uploadToCloudinary