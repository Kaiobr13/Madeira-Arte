const axios = require('axios');

/**
 * Função para buscar recomendações chamando a API Python
 * @param {number} userId
 * @returns {Array} Lista de recomendações
 */
async function getRecommendations(userId) {
    try {
      const pythonApiUrl = `http://localhost:5001/recomendacoes?user_id=${userId}`;
      const response = await axios.get(pythonApiUrl);
  
      if (response.status === 200) {
        const recommendedProductIds = response.data.map(item => item.id); // Extrair apenas os IDs
        return { data: recommendedProductIds };
      } else {
        throw new Error('Erro ao buscar recomendações da API Python.');
      }
    } catch (error) {
      console.error('Error in recommendations service:', error.message);
      throw error;
    }
  }
  
  

module.exports = {
  getRecommendations,
};
