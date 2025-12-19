import { Schema, model, Document } from "mongoose";

export interface ProjectDocument extends Document {
    role: string;
    name: string;
    image: string;
    images: string[];
    link: string;
    shortDescription: string;
    description: string;
    objective: string;
    technologies: string[];
    features: string[];
    systemComponents: string[];
    developerRole: string;
}

const projectSchema = new Schema<ProjectDocument>(
    {
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
    },
    { timestamps: true }
);

export const Project = model<ProjectDocument>("Project", projectSchema);
