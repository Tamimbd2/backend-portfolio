"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.getProjectById = exports.getAllProjects = exports.createProject = void 0;
const project_model_1 = require("./project.model");
const createProject = async (req, res) => {
    try {
        const payload = {
            ...req.body,
            images: req.files.map(file => file.path)
        };
        // ✅ Save to MongoDB
        const project = await project_model_1.Project.create(payload);
        return res.status(201).json({
            success: true,
            data: project,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.createProject = createProject;
const getAllProjects = async (req, res) => {
    try {
        const projects = await project_model_1.Project.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            data: projects,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getAllProjects = getAllProjects;
const getProjectById = async (req, res) => {
    try {
        const project = await project_model_1.Project.findOne({
            _id: req.params.id,
        });
        res.status(200).json({
            success: true,
            data: project,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getProjectById = getProjectById;
const deleteProject = async (req, res) => {
    try {
        const project = await project_model_1.Project.findByIdAndDelete(req.params.id);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.deleteProject = deleteProject;
