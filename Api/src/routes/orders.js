const express = require('express');
const router = express.Router();
const order = require('../services/orders');


router.get('/', async function(req, res, next) {
  try {
    res.json(await order.getOrders(req.query.page));
  } catch (err) {
    console.error(`Error while getting clients`, err.message);
    next(err);
  }
});

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


   /* DELETE order */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await order.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting order`, err.message);
    next(err);
  }
});

  module.exports = router;