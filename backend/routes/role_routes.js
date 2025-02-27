import express from "express";
import {
  getAllRole,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} from "../controllers/role_controllers.js";
import authMiddleWare from "../middleware.js";

const router = express.Router();

router.get("/", authMiddleWare, getAllRole);
router.get("/:id", authMiddleWare, getRoleById);
router.post("/", authMiddleWare, createRole);
router.put("/:id", authMiddleWare, updateRole);
router.delete("/:id", authMiddleWare, deleteRole);

export default router;
