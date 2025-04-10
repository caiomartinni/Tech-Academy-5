import express from "express";
import {
  getAllCars,
  getCarById,
  createCar,
  deleteCarById,
  updateCar,
} from "../controllers/carController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/cars", getAllCars);
router.get("/cars/:id", getCarById);
router.put("/cars/:id", updateCar);
router.post("/cars", authMiddleware, createCar);
router.delete("/cars/:id", authMiddleware, deleteCarById);

export default router;
