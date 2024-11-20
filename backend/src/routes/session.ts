import express, { Request, Response } from "express";
import PGModels from "../models";

const router = express.Router();

router.get("/user-signup", async (req: Request, res: Response) => {
  try {
    const users = await PGModels.User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error" });
  }
});

export default router