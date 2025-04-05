import express from "express";
import {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
} from "../controllers/carController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/cars", getAllCars);
router.get("/cars/:id", getCarById);

router.post("/cars", authMiddleware, createCar);
router.put("/cars/:id", authMiddleware, updateCar);
router.delete("/cars/:id", authMiddleware, deleteCar);

export default router;
