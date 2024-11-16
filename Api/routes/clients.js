const express = require('express');
const router = express.Router();
const clients = require('../services/clients');

/*LOG IN */ 
router.post('/login', async function(req, res, next) {
  try {
    const response = await clients.login(req.body);

    if (response.auth) {
      res.status(200).json({
        success: true,
        message: 'Login successful',
        token: response.token
      });
    } else {
      res.status(401).json({
        success: false,
        message: response.message || 'Login failed'
      });
    }
  } catch (error) {
    next(error);
  }
});


/* GET clients. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await clients.getclients(req.query.page));
  } catch (err) {
    console.error(`Error while getting clients`, err.message);
    next(err);
  }
});



/* POST  user_client */
router.post('/addclient', async function(req, res, next) {
    try {
      var s = await clients.registerCliente(req.body);
      console.log(s);
      res.json(s);
    } catch (err) {
      console.error(`Error while creating user`, err.message);
      next(err);
    }
  });


  
  /* PUT  user */
router.put('/:id', async function(req, res, next) {
    try {
      res.json(await clients.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating user`, err.message);
      next(err);
    }
  });

  /* DELETE user */
router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await clients.remove(req.params.id));
    } catch (err) {
      console.error(`Error while deleting user`, err.message);
      next(err);
    }
  });

module.exports = router;