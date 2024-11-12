const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

// Ürün ekleme
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Ürün eklenirken bir hata oluştu" });
  }
});

// Tüm ürünleri listeleme
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Ürünler alınırken bir hata oluştu" });
  }
});

// Ürün güncelleme
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct)
      return res.status(404).json({ error: "Ürün bulunamadı" });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Ürün güncellenirken bir hata oluştu" });
  }
});

// Ürün silme
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ error: "Ürün bulunamadı" });
    res.json({ message: "Ürün silindi" });
  } catch (error) {
    res.status(500).json({ error: "Ürün silinirken bir hata oluştu" });
  }
});

module.exports = router;
