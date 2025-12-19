"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectSchema = void 0;
const zod_1 = require("zod");
exports.projectSchema = zod_1.z.object({
    role: zod_1.z
        .string()
        .min(2, "Role is required"),
    name: zod_1.z
        .string()
        .min(2, "Project name is required"),
    link: zod_1.z
        .string()
        .url("Invalid project link"),
    shortDescription: zod_1.z
        .string()
        .min(10, "Short description is too short"),
    description: zod_1.z
        .string()
        .min(20, "Description is too short"),
    objective: zod_1.z
        .string()
        .min(20, "Objective is too short"),
    technologies: zod_1.z
        .array(zod_1.z.string().min(1))
        .min(1, "At least one technology is required"),
    features: zod_1.z
        .array(zod_1.z.string().min(1))
        .min(1, "At least one feature is required"),
    systemComponents: zod_1.z
        .array(zod_1.z.string().min(1))
        .min(1, "At least one system component is required"),
    developerRole: zod_1.z
        .string()
        .min(5, "Developer role is required")
});
