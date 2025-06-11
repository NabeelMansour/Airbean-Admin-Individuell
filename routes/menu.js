import { Router } from "express";
import Menu from "../models/menu.js";
import {
  getMenu,
  createNewProduct,
  updateProduct,
  deleteProduct,
} from "../services/menu.js";
import { requireAdmin, requireAuth } from "../middleware/authorization.js";

const router = Router();

// GET all products in menu
router.get("/", async (req, res, next) => {
  const menu = await getMenu();
  if (menu) {
    res.json({
      success: true,
      menu: menu,
    });
  } else {
    next({
      status: 404,
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
router.put("/:prodId", requireAdmin, async (req, res, next) => {
  const { prodId } = req.params;
  const { title, desc, price } = req.body;
  if (title && desc && price) {
    const result = await updateProduct(prodId, {
      title: title,
      desc: desc,
      price: price,
    });
    if (result) {
      res.status(201).json({
        success: true,
        message: "Product updated successfully",
      });
    } else {
      next({
        status: 400,
        message: "Product could not be updated",
      });
    }
  } else {
    next({
      status: 400,
      message: "Both title, desc and price are required",
    });
  }
});

// DELETE
router.delete("/:prodId", requireAdmin, async (req, res, next) => {
  const { prodId } = req.params;
  const result = await deleteProduct(prodId);

  if (result) {
    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } else {
    next({
      status: 400,
      message: "Could not delete product",
    });
  }
});

export default router;
