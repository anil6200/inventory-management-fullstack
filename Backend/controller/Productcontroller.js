const Product = require('../Models/ProductModel');
const asyncHandler = require('../Middleware/AsyncHandler');
const sharp=require("sharp");
const path=require("path");
const fs=require("fs")


// GET all products

exports.getProducts = asyncHandler(async(req, res) => {
    const products = await Product.find({ user: req.user.id });
    res.status(200).json(products);
});

// CREATE product

exports.createProduct = asyncHandler(async (req, res) => {
    const thumbnail = req.file ? { url: req.file.path, public_id: req.file.filename } : null;
    const product = await Product.create({
        user: req.user.id,
        ...req.body,
        thumbnail
    });
    res.status(200).json(product);
});

// UPDATE product

exports.updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedProduct);
});

// DELETE product

exports.deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await product.deleteOne();
    res.status(200).json({ id: req.params.id , message:"Product has been deleted successfuly"});
});
