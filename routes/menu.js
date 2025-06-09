import { Router } from "express";
import Menu from "../models/menu.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const menu = await Menu.find();
    res.json(menu);
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "No products could be found",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const menu = await Menu.findOne({ prodId: req.params.id });
    if (!menu) {
      return res.status(400).json({
        success: false,
        message: "No product was found with that ID",
      });
    }
    res.json(menu);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Could not fetch products",
    });
  }
});

export default router;
