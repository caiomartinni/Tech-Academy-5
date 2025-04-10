import { Request, Response } from "express";
import UserModel from "../models/UserModel";

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await UserModel.findAll();
  res.send(users);
};

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const user = await UserModel.findByPk(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, cpf } = req.body;

    if (!name || !email || !password || !cpf) {
      return res.status(400).json({ error: "Values required" });
    }

    if (!UserModel.validateCPF(cpf)) {
      return res.status(400).json({ error: "Invalid CPF" });
    }

    const user = await UserModel.create({ name, email, password, cpf });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error: " + error });
  }
};

export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { name, email, password } = req.body;

    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error: " + error });
  }
};

export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const user = await UserModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal server error: " + error });
  }
};
