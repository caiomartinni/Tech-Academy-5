import { Request, Response } from "express";
import Brand from "../models/BrandModel"; // Importa o modelo Brand

// 🔎 Buscar todas as marcas
export const getAllBrands = async (req: Request, res: Response) => {
  try {
    const brands = await Brand.findAll();
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
    const brand = await Brand.findByPk(id);

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

    // Validação: Garante que o nome foi enviado
    if (!name) {
      return res.status(400).json({ error: "O campo 'name' é obrigatório" });
    }

    // Criar a marca no banco de dados
    const newBrand = await Brand.create({ name });

    res
      .status(201)
      .json({ message: "Marca cadastrada com sucesso!", brand: newBrand });
  } catch (error) {
    console.error("Erro ao cadastrar marca:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};
