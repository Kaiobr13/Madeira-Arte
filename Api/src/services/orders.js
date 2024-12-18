const db = require("./db");
const helper = require("../helper");
const config = require("../config");

// Função para criar logs
async function CreateLog(log_message) {
  try {
    const result = await db.query(
      `INSERT INTO logs(log_message) VALUES (?)`,
      [log_message]
    );

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
  try {
    // Cria o pedido principal na tabela `orders`
    const [orderResult] = await db.query(
      `INSERT INTO orders (ord_status, ord_cli_id, ord_total) VALUES (?, ?, ?)`,
      ["Pendente", order.user_id, order.total]
    );

    // Obtém o ID do pedido recém-criado
    const orderId = orderResult.insertId;

    // Insere os detalhes do pedido na tabela `order_details`
    const orderDetails = order.products.map((product) => [
      orderId,
      product.id, // ID do produto
      product.quantity, // Quantidade do produto
      product.price, // Preço unitário do produto
    ]);

    // Query para inserir múltiplos detalhes de pedido de uma só vez
    const detailsResult = await db.query(
      `INSERT INTO order_details (det_ord_id, det_prod_id, det_quantity, prod_unit_price) VALUES ?`,
      [orderDetails]
    );

    // Log de sucesso
    const logMessage = `Pedido criado com sucesso: ID do pedido ${orderId}, Cliente ${order.user_id}, Total ${order.total}.`;
    await CreateLog(logMessage);

    // Mensagem de sucesso
    return {
      message: "Encomenda efetuada com sucesso!",
      orderId,
    };
  } catch (error) {
    console.error("Error during order creation:", error);

    // Log de erro
    const logMessage = `Erro ao criar pedido para Cliente ${order.user_id}: ${error.message}`;
    await CreateLog(logMessage);

    return { message: "Erro interno no servidor" };
  }
}

module.exports = {
  getOrders,
  addOrder,
};
