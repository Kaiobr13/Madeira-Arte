const db = require("./db");
const helper = require("../helper");
const config = require("../config");

// Função para criar logs
async function CreateLog(log_message) {
  try {
    const result = await db.query(`INSERT INTO logs(log_message) VALUES (?)`, [
      log_message,
    ]);

    let message = "Error in creating log";

    if (result.affectedRows) {
      message = "Log registado com sucesso!";
    }

    return { message: message };
  } catch (error) {
    console.error("Error creating log:", error);
    return { message: "Erro ao criar log" };
  }
}

// Função para obter pedidos com detalhes
async function getOrders(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT *
      FROM orders
      INNER JOIN order_details ON orders.ord_id = order_details.det_ord_id
      LIMIT ${offset}, ${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  // Adicionar log de consulta
  await CreateLog(`Consultou os pedidos na página.`);

  return {
    data,
    meta,
  };
}

// Função para adicionar um novo pedido com seus detalhes
async function addOrder(order) {
  const date = new Date();
  try {
    console.log("Recebendo dados do pedido:", order);

    // Verificar dados do produto
    const prod_id = order.prod_id;
    const unit_price = order.unit_price;
   

    if (!prod_id || !unit_price  ) {
      throw new Error("Dados do produto inválidos.");
    }

    // Inserir o pedido principal
    const orderResult = await db.query(
      `INSERT INTO orders (ord_status, ord_date, ord_cli_id, ord_total) VALUES (?, ?, ?, ?)`,
      ["Pendente", date, order.user_id, order.total]
    );

    console.log("Resultado da inserção do pedido:", orderResult);

    const orderId = orderResult.insertId;  // Pode ser que não precise de desestruturação

    // Inserir os detalhes do pedido
    await db.query(
      `INSERT INTO order_details (det_ord_id, det_prod_id, det_quantity, prod_unit_price) VALUES (?, ?, ?, ?)`,
      [orderId, prod_id, 1, unit_price]
    );

    // Criar log de sucesso
    await CreateLog(
      `Pedido criado com sucesso: ID do pedido ${orderId}, Cliente ${order.user_id}, Total ${order.total}.`
    );

    return {
      message: "Encomenda efetuada com sucesso!",
      orderId,
    };
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    await CreateLog(`Erro ao criar pedido para Cliente ${order.user_id}: ${error.message}`);
    return { message: "Erro interno no servidor" };
  }
}







module.exports = {
  getOrders,
  addOrder,
};
