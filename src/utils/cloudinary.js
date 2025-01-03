import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
// import { ApiError } from "./ApiError.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinery = async (localFilePath)=>{
    try {
        if (!localFilePath) {
            return null;
        }
        console.log(localFilePath);
        const response = await cloudinary.uploader.upload(localFilePath , {
            resource_type:"auto"
        }).catch((err)=>{
            console.log("uploading error :" , err);
        })
        //file has been uploaded successfully
        // console.log("file is uploaded in cloudinary" , response.url);
        fs.unlinkSync(localFilePath);
        return response;        
    } catch (error) {
        // remove the locally saved temporary file
        fs.unlinkSync(localFilePath);
        throw new Error("cloudinary upload error !!!" , error);
    }
}

export {uploadOnCloudinery}

// import { v2 as cloudinary } from 'cloudinary';

// (async function() {

//     // Configuration
//     cloudinary.config({ 
//         cloud_name: 'dvwwm6mba', 
//         api_key: '514536921925776', 
//         api_secret: '<your_api_secret>' // Click 'View API Keys' above to copy your API secret
//     });
    
//     // Upload an image
//      const uploadResult = await cloudinary.uploader
//        .upload(
//            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//                public_id: 'shoes',
//            }
//        )
//        .catch((error) => {
//            console.log(error);
//        });
    
//     console.log(uploadResult);
    
//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url('shoes', {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });
    
//     console.log(optimizeUrl);
    
//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url('shoes', {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });
    
//     console.log(autoCropUrl);    
// })();