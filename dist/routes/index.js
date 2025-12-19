"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = require("../middlewares/validateRequest");
const project_controller_1 = require("../module/project/project.controller");
const project_validate_1 = require("../module/project/project.validate");
const multer_config_1 = require("../utils/multer.config");
const auth_controller_1 = require("../module/auth/auth.controller");
const router = (0, express_1.Router)();
router.post("/", multer_config_1.multerUpload.array("files"), (0, validateRequest_1.validateRequest)(project_validate_1.projectSchema), project_controller_1.createProject);
router.get("/", project_controller_1.getAllProjects);
router.get("/:id", project_controller_1.getProjectById);
router.delete("/:id", project_controller_1.deleteProject);
//  user login
router.post("/login", auth_controller_1.AuthController.login);
exports.default = router;
