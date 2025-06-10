import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const menuSchema = new mongoose.Schema({
  prodId: {
    type: String,
    required: true,
    default: () => uuidv4().replace(/-/g, "").slice(0, 8),
    unique: true,
  },
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  desc: {
    type: String,
    maxlength: 200,
  },
  price: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Menu = mongoose.model("Menu", menuSchema, "menu");

export default Menu;
