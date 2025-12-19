import { Request, Response } from "express";
import { Project } from "./project.model";

export const createProject = async (req: Request, res: Response) => {
    try {
        const payload: any = {
            ...req.body,
            images: (req.files as Express.Multer.File[]).map(file => file.path)
        }


        // ✅ Save to MongoDB
        const project = await Project.create(payload);

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


export const getProjectById = async (req: Request, res: Response) => {
    try {
        const project = await Project.findOne({
            _id: req.params.id,
        });

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
