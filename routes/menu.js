import { Router } from "express";
import Menu from "../models/menu.js";

const router = Router();

// GET all products in menu
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

// GET product by ID
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

// POST add new product to menu

// PUT

export default router;
