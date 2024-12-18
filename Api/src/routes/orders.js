const express = require('express');
const router = express.Router();
const orders = require('../services/orders');


router.post('/addorder', async function(req, res, next) {
    try {
      var s = await orders.addorder(req.body);
      console.log(s);
      res.json(s);
    } catch (err) {
      console.error(`Error while creating user`, err.message);
      next(err);
    }
  });