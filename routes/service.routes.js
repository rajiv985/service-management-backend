import express from "express";
import {createService,getUserServices,updateService,deleteService} from "../controllers/service.controllers.js";
import {verifyUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", verifyUser, createService);
router.get("/", verifyUser, getUserServices);
router.put("/:id", verifyUser, updateService);
router.delete("/:id", verifyUser, deleteService);

export default router;
