import Menu from "../models/menu.js";

export async function getMenu() {
  return await Menu.find();
}

export async function getProductByUserId(userId) {
  return await Order.find({ userId });
}

export async function createNewProduct(product) {
  try {
    const result = await Menu.create(product);
    return result;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}
