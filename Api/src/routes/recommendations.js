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

    // Obter apenas os IDs recomendados
    const recommendedIds = await recommendationsService.getRecommendations(userId);

    res.status(200).json(recommendedIds); // Envia os IDs diretamente
  } catch (err) {
    console.error('Error while fetching recommendations:', err.message);
    res.status(500).json({ error: 'Erro ao buscar recomendações.' });
  }
});


// Rota para buscar produtos pelos IDs
router.post("/getprodbyid/:ids", async (req, res) => {
  try {
    const ids = req.params.ids; // Obtém os IDs da URL
    if (!ids) {
      return res.status(400).json({ error: "IDs de produtos são obrigatórios." });
    }

    const products = await recommendationsService.getProductsById(ids); // Chama o serviço para buscar os produtos
    res.status(200).json(products); // Retorna os produtos como resposta
  } catch (error) {
    console.error("Erro ao buscar produtos:", error.message);
    res.status(500).json({ error: "Erro ao buscar produtos." });
  }
});




module.exports = router;
