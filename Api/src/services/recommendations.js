const axios = require('axios');
const db = require("./db");
const helper = require("../helper");
const config = require("../config");

/**
 * Função para buscar recomendações chamando a API Python
 * @param {number} userId
 * @returns {Array} Lista de IDs recomendados
 */
async function getRecommendations(userId) {
    try {
      const pythonApiUrl = `http://localhost:5001/recomendacoes?user_id=${userId}`;
      const response = await axios.get(pythonApiUrl);
  
      if (response.status === 200) {
        return response.data; // Retorna os IDs diretamente
      } else {
        throw new Error('Erro ao buscar recomendações da API Python.');
      }
    } catch (error) {
      console.error('Error in recommendations service:', error.message);
      throw error;
    }
  }
  
  async function getProductsById(ids) {
    const idArray = ids.split(",").map((id) => parseInt(id, 10)); // Converte os IDs para números
  
    if (idArray.some(isNaN)) {
      throw new Error("IDs inválidos fornecidos");
    }
  
    const placeholders = idArray.map(() => "?").join(",");
    const query = `SELECT * FROM product WHERE prod_id IN (${placeholders})`;
  
    const rows = await db.query(query, idArray);
    const data = helper.emptyOrRows(rows);
  
    return {
      data,
    };
  }

module.exports = {
  getRecommendations,
  getProductsById
};
