const express = require('express');
const router = express.Router();
const orders = require('../services/products');


router.get('/getrecomendedprods', async function(req, res, next) {
    try {
      res.json(await orders.getRecomendedProducts());
    } catch (err) {
      console.error(`Error while getting orders`, err.message);
      next(err);
    }
  });

  router.get('/getprods', async function(req, res, next) {
    try {
      res.json(await orders.getProducts());
    } catch (err) {
      console.error(`Error while getting orders`, err.message);
      next(err);
    }
  });

  module.exports = router;