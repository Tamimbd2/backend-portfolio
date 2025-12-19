import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

/**
 * Multer (memory storage)
 */
const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

/**
 * Cloudinary config
 * (dotenv MUST be loaded before this file is imported)
 */
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// ✅ Debug (temporary – remove later)
console.log("Cloudinary ENV:", {
    cloud: process.env.CLOUDINARY_CLOUD_NAME,
    key: process.env.CLOUDINARY_API_KEY ? "OK" : "MISSING",
    secret: process.env.CLOUDINARY_API_SECRET ? "OK" : "MISSING",
});

/**
 * Upload multiple images to Cloudinary
 */
export const uploadMultipleToCloudinary = async (
    files: Express.Multer.File[],
    folder = "projects"
): Promise<string[]> => {
    const uploads = files.map((file) => {
        return new Promise<string>((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    { folder, resource_type: "image" },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result!.secure_url);
                    }
                )
                .end(file.buffer);
        });
    });

    return Promise.all(uploads);
};

export const fileUpload = {
    upload,
    uploadMultipleToCloudinary,
};
