import Menu from "../models/menu.js";

export async function getMenu() {
  try {
    const menu = await Menu.find();
    return menu;
  } catch (error) {
    return null;
  }
}

export async function getProductByUserId(userId) {
  try {
    const menu = await Order.find({ userId });
    if (menu.length < 1) throw new Error("No product found");
    else return menu;
  } catch (error) {
    return null;
  }
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

export async function updateProduct(prodId, newProduct) {
  try {
    const result = await Menu.findOneAndUpdate({ prodId: prodId }, newProduct);
    return result;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

export async function deleteProduct(prodId) {
  try {
    const result = await Menu.findOneAndDelete({ prodId: prodId });
    return result;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}
