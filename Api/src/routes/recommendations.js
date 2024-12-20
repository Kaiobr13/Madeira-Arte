const express = require('express');
const router = express.Router();
const recommendationsService = require('../services/recommendations');

/* GET recommendations */
router.get('/', async function (req, res, next) {
  try {
    const userId = req.query.user_id;
    if (!userId) {
      return res.status(400).json({ error: 'O parâmetro user_id é obrigatório.' });
    }

    const response = await recommendationsService.getRecommendations(userId);

    // Garantir que a resposta seja no formato correto
    res.status(200).json(response);
  } catch (err) {
    console.error('Error while fetching recommendations:', err.message);
    res.status(500).json({ error: 'Erro ao buscar recomendações.' });
  }
});

module.exports = router;
