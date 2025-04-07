import express from "express";
import {
  getAllCars,
  getCarById,
  createCar,
} from "../controllers/carController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// 🔓 Rotas públicas
router.get("/cars", getAllCars);
router.get("/cars/:id", getCarById);

// 🔒 Rota privada (cadastro de carro requer autenticação)
router.post("/cars", authMiddleware, createCar);

export default router;
