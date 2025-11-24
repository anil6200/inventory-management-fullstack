const express = require('express');
const router = express.Router();
const { protected } = require('../Middleware/Authmiddleware');
const upload=require('../Middleware/Upload')
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controller/Productcontroller');

// GET /api/products

router.get('/', protected, getProducts);

// POST /api/products

router.post('/', protected, upload.single('thumbnail'), createProduct);

// PUT /api/products/:id

router.put('/:id', protected,upload.single('thumbnail'), updateProduct);

// DELETE /api/products/:id

router.delete('/:id', protected, deleteProduct);

module.exports = router;
