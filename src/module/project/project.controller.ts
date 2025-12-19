import { NextFunction, Request, Response } from "express";
import { Project } from "./project.model";
import { fileUpload, uploadMultipleToCloudinary } from "../../utils/fileUpload";


/**
 * CREATE Project
 */
export const createProject = async (req: Request, res: Response) => {
    try {
        const files = req.files as Express.Multer.File[];

        if (!files || files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one image is required",
            });
        }

        // ✅ Upload all images
        const imageUrls = await uploadMultipleToCloudinary(files);

        console.log(imageUrls);

        // ✅ Save to MongoDB
        const project = await Project.create({
            ...req.body,
            image: imageUrls[0],   // main image
            images: imageUrls,     // gallery
        });

        return res.status(201).json({
            success: true,
            data: project,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * GET All Projects
 */
export const getAllProjects = async (req: Request, res: Response) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: projects,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * GET Project by Name
 */
export const getProjectByName = async (req: Request, res: Response) => {
    try {
        const project = await Project.findOne({
            name: req.params.name,
        });

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        res.status(200).json({
            success: true,
            data: project,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 * DELETE Project
 */
export const deleteProject = async (req: Request, res: Response) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Project deleted successfully",
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
