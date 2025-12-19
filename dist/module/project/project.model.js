"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const mongoose_1 = require("mongoose");
const projectSchema = new mongoose_1.Schema({
    role: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    image: { type: String },
    images: { type: [String] },
    link: { type: String, required: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    objective: { type: String, required: true },
    technologies: { type: [String], required: true },
    features: { type: [String], required: true },
    systemComponents: { type: [String], required: true },
    developerRole: { type: String, required: true }
}, { timestamps: true });
exports.Project = (0, mongoose_1.model)("Project", projectSchema);
