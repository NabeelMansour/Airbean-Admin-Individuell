import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  prodId: {
    type: String,
    required: true,
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
});

const Menu = mongoose.model("Menu", menuSchema, "menu");

export default Menu;
