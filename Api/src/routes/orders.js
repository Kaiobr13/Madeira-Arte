const express = require('express');
const router = express.Router();
const order = require('../services/orders');

router.post('/addorder', async function(req, res, next) {
    try {
      var s = await order.addOrder(req.body);
      console.log(s);
      res.json(s);
    } catch (err) {
      console.error(`Error while creating user`, err.message);
      next(err);
    }
  });

  module.exports = router;