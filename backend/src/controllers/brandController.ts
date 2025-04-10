import { Request, Response } from "express";
import BrandModel from "../models/BrandModel";

// 🔎 Buscar todas as marcas
export const getAllBrands = async (req: Request, res: Response) => {
  try {
    const brands = await BrandModel.findAll();
    res.json(brands);
  } catch (error) {
    console.error("Erro ao buscar marcas:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// 🔎 Buscar uma marca por ID
export const getBrandById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const brand = await BrandModel.findByPk(id);

    if (!brand) {
      return res.status(404).json({ error: "Marca não encontrada" });
    }

    res.json(brand);
  } catch (error) {
    console.error("Erro ao buscar marca por ID:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// ✨ Criar uma nova marca
export const createBrand = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "O campo 'name' é obrigatório" });
    }

    const newBrand = await BrandModel.create({ name });

    res
      .status(201)
      .json({ message: "Marca cadastrada com sucesso!", brand: newBrand });
  } catch (error) {
    console.error("Erro ao cadastrar marca:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// ❌ Deletar marca por ID
export const deleteBrandById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const brand = await BrandModel.findByPk(req.params.id);
    if (!brand) {
      return res.status(404).json({ error: "Marca não encontrada" });
    }
    await brand.destroy();
    res.status(200).json({ message: "Marca excluída com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor: " + error });
  }
};

// 🔁 Atualizar marca por ID
export const updateBrandById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "O campo 'name' é obrigatório" });
    }

    const brand = await BrandModel.findByPk(id);

    if (!brand) {
      return res.status(404).json({ error: "Marca não encontrada" });
    }

    brand.name = name;
    await brand.save();

    res.status(200).json({ message: "Marca atualizada com sucesso!", brand });
  } catch (error) {
    console.error("Erro ao atualizar marca:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

