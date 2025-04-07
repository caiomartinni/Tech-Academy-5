import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// Rota pública (não exige login)
router.post("/users", createUser);

// Rotas privadas (exigem token JWT)
router.get("/users", getAllUsers);
router.get("/users/:id", authMiddleware, getUserById);
router.put("/users/:id", authMiddleware, updateUser);
router.delete("/users/:id", authMiddleware, deleteUser);

export default router;
