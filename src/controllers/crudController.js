const express = require('express');

const Product = require('./../models/Product');

const router = express.Router();

// router = "http://localhost:3000/products/" -> List all products
router.get('/', (req, res) => {
  return Product.find((err, products) => {
    !err ? res.send(products) : res.json(products);
  });
});

// router = "http://localhost:3000/products/create/" -> Create a product
router.post('/create', async(req, res) => {
  try {
    const product = await Product.create(req.body);
    
    res.header('Access-Control-Allow-Origin', '*');
    
    return res.send({ product });
  } catch(err) {
    return res.status(400).send({ error: "Falha na criação do produto." })
  }
});

module.exports = app => app.use('/products/', router);