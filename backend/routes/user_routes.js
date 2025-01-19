import express from "express";

const router = express.Router();
import {
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user_controllers.js";

router.get("/user", getAllUser);
router.get("/user/:id", getUserById);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

export default router;
