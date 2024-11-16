const db = require("./db");
const helper = require("../helper");
const config = require("../config");
const jwt = require("jsonwebtoken"); // Importar jwt

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

//login
async function login(user) {
  try {
    // Utilizar prepared statements para evitar injeção de SQL
    const result = await db.query(
      `SELECT client_id, client_name, client_password, client_email, class_id FROM client WHERE client_email = ?`,
      [user.email]
    );

    let message = "Error logging in";

    if (result.length > 0) {
      const userRecord = result[0];

      // Comparar a senha diretamente (sem criptografia)
      const passwordIsValid = userRecord.client_password === user.password;
      date = new Date();
      if (passwordIsValid) {
        // Criar uma mensagem de log (certifique-se de que CreateLog está definida)
        const logMessage = `${user.email} fez login a ${date
          .getTime()
          .toString()}}`;
        await CreateLog(logMessage); // Certifique-se de que CreateLog está definida

        return { auth: true, message: "Login successful" };
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

async function CreateLog(log_message) {
  // Inserir o novo log
  const result = await db.query(
    `INSERT INTO logs(log_message)
  VALUES
  ('${log_message}')`
  );

  let message = "Error in creating log";

  if (result.affectedRows) {
    message = "log registado com sucesso!";
    return { message: message };
  }

  return { message: message };
}

//register a client
async function registerCliente(user) {
  // Verificar se o email já existe
  const emailCheck = await db.query(
    `SELECT client_id FROM client WHERE client_email = '${user.email}'`
  );

  if (emailCheck.length > 0) {
    return { message: "Email já existe" };
  }

  // Inserir o novo usuário
  const result = await db.query(
    `INSERT INTO client(client_name, client_email, client_password, class_id, client_place)
      VALUES 
      ('${user.name}', '${user.email}', '${user.password}', 3,'${user.place}')`
  );

  let message = "Error in creating user";

  if (result.affectedRows) {
    var date = new Date();
    message = "Registo efectuado com sucesso!";
    //adicionar logs
    logmessage = `${user.name} registou-se com o Email: ${user.email} a ${date.getTime().toString()}`;
    CreateLog(logmessage);
    // Gerar um token
    const token = jwt.sign(
      { id: result.insertId, name: user.name },
      config.secret, // Use a secret key from your config
      { expiresIn: "12h" } // Token expires in 1 hour
    );

    return { message: message, token: token };
  }

  return { message: message };
}

async function update(id, user) {
  const emailCheck = await db.query(
    `SELECT user_id FROM app_clients WHERE user_email = '${user.email}'`
  );

  if (emailCheck.length > 0) {
    return { message: "Email já existe" };
  }

  const result = await db.query(
    `UPDATE app_clients 
      SET user_name="${user.name}", user_password=${user.pass}, user_email=${user.mail}, 
      user_logo=${user.logo}
      WHERE user_id=${id}`
  );

  let message = "Error in updating user";

  if (result.affectedRows) {
    message = "User updated successfully";
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(`DELETE FROM app_clients WHERE user_id=${id}`);

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
