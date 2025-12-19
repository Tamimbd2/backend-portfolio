import { NextFunction, Request, Response, Router } from "express";
import { createProject, deleteProject, getAllProjects, getProjectByName } from "../module/project/project.controller";
import { fileUpload } from "../utils/fileUpload";
import { projectSchema } from "../module/project/project.validate";


const router = Router();

router.post(
    "/",
    fileUpload.upload.array("file", 5), // multiple images
    (req: Request, res: Response) => {
        req.body = projectSchema.parse(JSON.parse(req.body.data));
        return createProject(req, res);
    }
);

router.get("/", getAllProjects);
router.get("/:name", getProjectByName);
router.delete("/:id", deleteProject);

export default router;
