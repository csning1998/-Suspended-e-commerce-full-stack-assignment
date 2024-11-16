import express, { Request, Response } from "express";
import PGModels from "../models";

const router = express.Router();

router.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await PGModels.User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error" });
  }
});

router.get("/add-users", async (req: Request, res: Response) => {
  try {
    const users = await PGModels.User.create({
      firstName: "firstName",
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
});
export default router