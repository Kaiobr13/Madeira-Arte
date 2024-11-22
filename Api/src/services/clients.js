const db = require("./db");
const helper = require("../helper");
const config = require("../config");
const jwt = require("jsonwebtoken"); // Importar jwt
const bcrypt = require("bcrypt"); // Importar bcrypt

async function getclients(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT *
    FROM client LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

// Função de login
async function login(user) {
  try {
    // Utilizar prepared statements para evitar injeção de SQL
    const result = await db.query(
      `SELECT cli_id, cli_name, cli_password, cli_email, cli_cla_id FROM client WHERE cli_email = ?`,
      [user.email]
    );

    let message = "Error logging in";

    if (result.length > 0) {
      const userRecord = result[0];

      // Comparar a senha usando bcrypt
      const passwordIsValid = await bcrypt.compare(
        user.password,
        userRecord.cli_password
      );

      date = new Date();
      if (passwordIsValid) {
        // Criar uma mensagem de log (certifique-se de que CreateLog está definida)
        const logMessage = `${user.email} fez login a ${date.toISOString()}`;
        await CreateLog(logMessage);

        // Gerar um token para o usuário
        const token = jwt.sign(
          { id: userRecord.cli_id, name: userRecord.cli_name },
          config.secret, // Segredo definido no seu arquivo de configuração
          { expiresIn: "12h" }
        );

        return { auth: true, message: "Login successful", token };
      } else {
        message = "Invalid credentials";
      }
    } else {
      message = "User not found";
    }

    return { auth: false, message: message };
  } catch (error) {
    console.error("Error during login:", error);
    return { auth: false, message: "Internal server error" };
  }
}

// Função para registrar um cliente
async function registerCliente(user) {
  try {
    // Verificar se o email já existe
    const emailCheck = await db.query(
      `SELECT cli_id FROM client WHERE cli_email = ?`,
      [user.email]
    );

    if (emailCheck.length > 0) {
      return { message: "Email já existe" };
    }

    // Gerar um hash seguro da senha com bcrypt
    const hashedPassword = await bcrypt.hash(user.password, 10); // O número 10 representa o custo do salt

    // Inserir o novo usuário
    const result = await db.query(
      `INSERT INTO client(cli_name, cli_email, cli_password, cli_cla_id, cli_place)
      VALUES (?, ?, ?, ?, ?)`,
      [user.name, user.email, hashedPassword, 3, user.place]
    );

    let message = "Error in creating user";

    if (result.affectedRows) {
      const date = new Date();
      message = "Registo efectuado com sucesso!";
      // Adicionar logs
      const logmessage = `${user.name} registou-se com o Email: ${user.email} a ${date.toISOString()}`;
      await CreateLog(logmessage);

      // Gerar um token
      const token = jwt.sign(
        { id: result.insertId, name: user.name },
        config.secret, // Use a secret key from seu config
        { expiresIn: "12h" } // Token expira em 12 horas
      );

      return { message: message, token: token };
    }

    return { message: message };
  } catch (error) {
    console.error("Error during registration:", error);
    return { message: "Internal server error" };
  }
}

// Função para criar logs
async function CreateLog(log_message) {
  // Inserir o novo log
  const result = await db.query(
    `INSERT INTO logs(log_message)
  VALUES
  (?)`,
    [log_message]
  );

  let message = "Error in creating log";

  if (result.affectedRows) {
    message = "log registado com sucesso!";
    return { message: message };
  }

  return { message: message };
}

async function update(id, user) {
  const emailCheck = await db.query(
    `SELECT user_id FROM app_clients WHERE user_email = ?`,
    [user.email]
  );

  if (emailCheck.length > 0) {
    return { message: "Email já existe" };
  }

  const result = await db.query(
    `UPDATE app_clients 
      SET user_name=?, user_password=?, user_email=?, 
      user_logo=?
      WHERE user_id=?`,
    [user.name, user.pass, user.mail, user.logo, id]
  );

  let message = "Error in updating user";

  if (result.affectedRows) {
    message = "User updated successfully";
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(`DELETE FROM app_clients WHERE user_id=?`, [id]);

  let message = "Error in deleting user";

  if (result.affectedRows) {
    message = "User deleted successfully";
  }

  return { message };
}

module.exports = {
  getclients,
  login,
  registerCliente,
  update,
  remove,
};
