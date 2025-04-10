import { Request, Response, NextFunction } from "express";

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  next();
};

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, cpf } = req.body;
  if (!name || !email || !password || !cpf) {
    return res.status(400).json({ error: "All fields are required" });
  }
  next();
};

export const validateCar = (req: Request, res: Response, next: NextFunction) => {
  const { model, description, specs, averagePrice, type, year, brandId } = req.body;
  if (!model || !description || !specs || !averagePrice || !type || !year || !brandId) {
    return res.status(400).json({ error: "All fields are required" });
  }
  next();
};

export const validateBrand = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  next();
};