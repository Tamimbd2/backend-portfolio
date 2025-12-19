"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryUpload = exports.deleteImageFromCloudinary = exports.uploadBufferCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const stream_1 = __importDefault(require("stream"));
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const uploadBufferCloudinary = async (buffer, fileName) => {
    try {
        return new Promise((resolve, reject) => {
            const public_id = `pdf/${fileName}-${Date.now()}`;
            const bufferStream = new stream_1.default.PassThrough();
            bufferStream.end((buffer));
            cloudinary_1.v2.uploader.upload_stream({
                resource_type: "auto",
                public_id: public_id,
                folder: "pdf"
            }, (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            }).end(buffer);
        });
    }
    catch (error) {
        console.log(error);
        throw new Error(`Error uploading file .Error : ${error.message}`);
    }
};
exports.uploadBufferCloudinary = uploadBufferCloudinary;
const deleteImageFromCloudinary = async (url) => {
    try {
        const regex = /\/v\d+\/(.*?)\.(jpg|jpeg|png|gif|webp)$/i;
        const match = url.match(regex);
        if (match && match[1]) {
            const public_id = match[1];
            await cloudinary_1.v2.uploader.destroy(public_id);
            console.log(`file ${public_id} is deleted from cloudinary`);
        }
    }
    catch (error) {
        throw new Error(`Error deleting file .Error : ${error.message}`);
    }
};
exports.deleteImageFromCloudinary = deleteImageFromCloudinary;
exports.cloudinaryUpload = cloudinary_1.v2;
