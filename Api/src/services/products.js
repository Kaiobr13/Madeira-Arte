const db = require("./db");
const helper = require("../helper");
const config = require("../config");

//furure AI feature
async function getRecomendedProducts(page = 1, clientid) {
  const offset = helper.getOffset(page, config.listPerPage);
  category = 4; //categoria do produdo a recomendar
  const rows = await db.query(
    `SELECT * FROM product
    WHERE prod_cat_id = ${category}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function getProducts(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  category = 4; //categoria do produdo a recomendar
  const rows = await db.query(
    `SELECT * FROM product`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function getProductsById(ids) {
  // Converte a string de IDs em um array (se necessário)
  const idArray = ids.split(",").map((id) => parseInt(id, 10)); // Garante que os IDs sejam números

  if (idArray.some(isNaN)) {
    throw new Error("IDs inválidos fornecidos");
  }

  // Constrói um número correto de placeholders
  const placeholders = idArray.map(() => "?").join(",");

  const query = `SELECT * FROM product WHERE prod_id IN (${placeholders})`;

  const rows = await db.query(query, idArray); // Usa placeholders e substitui por `idArray`
  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
}


module.exports = {
  getRecomendedProducts,
  getProducts,
  getProductsById,
};
