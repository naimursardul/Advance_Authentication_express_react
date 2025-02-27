import express from "express";

const router = express.Router();
import {
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user_controllers.js";
import authMiddleWare from "../middleware.js";

router.get("/", authMiddleWare, getAllUser);
router.get("/:id", authMiddleWare, getUserById);
router.put("/:id", authMiddleWare, updateUser);
router.delete("/:id", authMiddleWare, deleteUser);

export default router;
