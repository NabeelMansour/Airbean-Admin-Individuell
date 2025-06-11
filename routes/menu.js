import { Router } from "express";
import Menu from "../models/menu.js";
import { getMenu, createNewProduct } from "../services/menu.js";
import { requireAdmin, requireAuth } from "../middleware/authorization.js";

const router = Router();

// GET all products in menu
router.get("/", requireAuth, async (req, res) => {
  try {
    const menu = await getMenu();
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
router.post("/", requireAdmin, async (req, res, next) => {
  console.log(requireAdmin);
  const { title, desc, price } = req.body;
  if (title && desc && price) {
    const result = await createNewProduct({
      title: title,
      desc: desc,
      price: price,
    });
    if (result) {
      res.status(201).json({
        success: true,
        message: "New product created successfully",
      });
    } else {
      next({
        status: 400,
        message: "New product could not be created",
      });
    }
  } else {
    next({
      status: 400,
      message: "Both title, desc and price are required",
    });
  }
});

// PUT

export default router;
