
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import stream from "stream"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!
});


export const uploadBufferCloudinary = async (buffer: Buffer, fileName: string): Promise<UploadApiResponse | undefined> => {
    try {
        return new Promise((resolve, reject) => {

            const public_id = `pdf/${fileName}-${Date.now()}`;
            const bufferStream = new stream.PassThrough();
            bufferStream.end((buffer))

            cloudinary.uploader.upload_stream(
                {
                    resource_type: "auto",
                    public_id: public_id,
                    folder: "pdf"
                },
                (error, result) => {
                    if (error) {
                        return reject(error)
                    }
                    resolve(result)
                }
            ).end(buffer)


        })

    } catch (error: any) {
        console.log(error);
        throw new Error(`Error uploading file .Error : ${error.message}`)
    }
}

export const deleteImageFromCloudinary = async (url: string) => {
    try {


        const regex = /\/v\d+\/(.*?)\.(jpg|jpeg|png|gif|webp)$/i;
        const match = url.match(regex);

        if (match && match[1]) {
            const public_id = match[1];
            await cloudinary.uploader.destroy(public_id);
            console.log(`file ${public_id} is deleted from cloudinary`);
        }


    } catch (error: any) {
        throw new Error(`Error deleting file .Error : ${error.message}`)
    }
}


export const cloudinaryUpload = cloudinary
