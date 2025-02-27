import express from "express";
import authMiddleWare from "../middleware.js";
import {
  createPermission,
  deletePermission,
  getAllPermission,
  getPermissionById,
  updatePermission,
} from "../controllers/permission_controllers.js";

const router = express.Router();

router.post("/", authMiddleWare, createPermission);
router.get("/", authMiddleWare, getAllPermission);
router.get("/:id", authMiddleWare, getPermissionById);
router.put("/:id", authMiddleWare, updatePermission);
router.delete("/:id", authMiddleWare, deletePermission);

export default router;
