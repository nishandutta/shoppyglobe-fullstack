const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const authMiddleware = require("../middleware/authMiddleware");

// GET user cart
router.get("/", authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST add to cart
router.post("/", authMiddleware, async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = new Cart({ user: req.user.id, items: [] });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();
  // populate before returning
  await cart.populate("items.product");
  res.json(cart);
});

// PUT update quantity
router.put("/:productId", authMiddleware, async (req, res) => {
  const { quantity } = req.body;
  const cart = await Cart.findOne({ user: req.user.id });

  if (!cart) return res.status(404).json({ message: "Cart not found" });

  const item = cart.items.find((i) => i.product.toString() === req.params.productId);
  if (item) {
    item.quantity = quantity;
  }

  await cart.save();
  await cart.populate("items.product");
  res.json(cart);
});

// routes/cart.js
router.delete("/clear", authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { user: req.user.id },
      { items: [] },
      { new: true }
    );
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to clear cart" });
  }
});

// DELETE remove item
router.delete("/:productId", authMiddleware, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id });
  cart.items = cart.items.filter((i) => i.product.toString() !== req.params.productId);

  await cart.save();
  await cart.populate("items.product");
  res.json(cart);
});

module.exports = router;
