import { Request, Response } from "express";
import BrandModel from "../models/BrandModel";

// Busca todas as marcas
export const getAllBrands = async (req: Request, res: Response) => {
  const brands = await BrandModel.findAll();
  res.send(brands);
};

// Busca uma marca por ID
export const getBrandById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const brand = await BrandModel.findByPk(req.params.id);
  if (!brand) {
    return res.status(404).json({ error: "Brand not found" });
  }
  res.json(brand);
};

// Cria uma nova marca
export const createBrand = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name required" });
    }

    const brand = await BrandModel.create({ name });
    res.status(201).json(brand);
  } catch (error) {
    res.status(500).json({ error: "Internal server error: " + error });
  }
};
