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

module.exports = {
  getRecomendedProducts,
};
