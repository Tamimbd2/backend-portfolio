import { z } from "zod";

export const projectSchema = z.object({
    role: z
        .string()
        .min(2, "Role is required"),

    name: z
        .string()
        .min(2, "Project name is required"),

    link: z
        .string()
        .url("Invalid project link"),

    shortDescription: z
        .string()
        .min(10, "Short description is too short"),

    description: z
        .string()
        .min(20, "Description is too short"),

    objective: z
        .string()
        .min(20, "Objective is too short"),

    technologies: z
        .array(z.string().min(1))
        .min(1, "At least one technology is required"),

    features: z
        .array(z.string().min(1))
        .min(1, "At least one feature is required"),

    systemComponents: z
        .array(z.string().min(1))
        .min(1, "At least one system component is required"),

    developerRole: z
        .string()
        .min(5, "Developer role is required")
});

export type ProjectInput = z.infer<typeof projectSchema>;
