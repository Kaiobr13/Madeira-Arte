const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getorders(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT *
      FROM orders
      INNER JOIN orderdetails ON order.ord_id = orderdetails.det_ord_id LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function addorder(order) {
  try {
    // Inserir o nova order
    const result = await db.query(
      `insert into orders ( ord_status, ord_cli_id, ord_total)
       values (?, ?, ?);
       insert into order_details (det_ord_id, det_prod_id, det_quantity, prod_unit_price)
       values (?, ?, ?, ?)`,
      ["Pendente", , , , , , ]
    );

    let message = "Error in creating user";

    if (result.affectedRows) {
      const date = new Date();
      message = "Registo efectuado com sucesso!";
      // Adicionar logs
      const logmessage = `${user.name} registou-se com o Email: ${
        user.email
      } a ${date.toISOString()}`;
      await CreateLog(logmessage);
    }

    return { message: message };
  } catch (error) {
    console.error("Error during registration:", error);
    return { message: "Internal server error" };
  }
}
