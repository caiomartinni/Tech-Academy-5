import express from "express";
import {
  getAllBrands,
  getBrandById,
  createBrand,
} from "../controllers/brandController"; // ✅ Certifique-se de que este caminho está correto!
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// 🔓 Rotas públicas
router.get("/api/brands", getAllBrands);
router.get("/api/brands/:id", getBrandById);

// 🔒 Rotas privadas (apenas criação de marca requer autenticação)
router.post("/api/brands", authMiddleware, createBrand);

export default router;
