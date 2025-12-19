import { Router } from "express";
import { validateRequest } from "../middlewares/validateRequest";
import { createProject, deleteProject, getAllProjects, getProjectById } from "../module/project/project.controller";
import { projectSchema } from "../module/project/project.validate";
import { multerUpload } from "../utils/multer.config";
import { AuthController } from "../module/auth/auth.controller";


const router = Router();

router.post(
    "/",
    multerUpload.array("files"),
    validateRequest(projectSchema),
    createProject
);

router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.delete("/:id", deleteProject);

//  user login
router.post("/login", AuthController.login);

export default router;
