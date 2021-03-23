const express = require('express');
const ProductController = require('../controllers/product')
const checkAuth =require('../middleware/check-auth');

const router = express.Router();

router.post("/addProduct",ProductController.add_product);
router.get("/",checkAuth,ProductController.show_all_products);

module.exports = router;