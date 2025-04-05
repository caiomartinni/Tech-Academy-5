import express from "express";
import {
  getAllBrands,
  getBrandById,
  createBrand,
} from "../controllers/brandController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// rotas públicas
router.get("/brands", getAllBrands);
router.get("/brands/:id", getBrandById);

// rotas privadas (apenas criação de marca)
router.post("/brands", authMiddleware, createBrand);

export default router;
