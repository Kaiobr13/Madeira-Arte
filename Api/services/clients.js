const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const jwt = require('jsonwebtoken'); // Importar jwt

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
    meta
  }
}

//login
async function login(user) {
  const result = await db.query(
    `SELECT client_id, client_name, client_password, client_email, class_id FROM client
     WHERE client_email = '${user.email}'`
  );
  let message = 'Error logging in';

  if (result.length > 0) {
    const userRecord = result[0];
    
    if (userRecord.user_password) {
      // Assuming `decrypt` is used to decrypt the stored password
      try {
        const decryptedPassword =userRecord.user_password;
        const passwordIsValid = decryptedPassword === user.pass;

        if (passwordIsValid) {
          // Generate a token
          const token = jwt.sign(
            { id: userRecord.user_id, name: userRecord.user_name },
            config.secret, // Use a secret key from your config
            { expiresIn: '12h' } // Token expires in 1 hour
          );

          return { auth: true, token: token };
        } else {
          message = 'Invalid credentials';
        }
      } catch (err) {
        console.error('Error decrypting password', err);
        message = 'Error decrypting password';
      }
    } else {
      message = 'Password is undefined';
    }
  }

  return { auth: false, token: null, message: message };
}

//register a client
async function registerCliente(user) {
  // Verificar se o email já existe
  const emailCheck = await db.query(
    `SELECT client_id FROM client WHERE client_email = '${user.email}'`
  );

  if (emailCheck.length > 0) {
    return { message: 'Email já existe' };
  }

  // Inserir o novo usuário
  const result = await db.query(
    `INSERT INTO client(client_name, client_email, client_password, class_id, client_place)
      VALUES 
      ('${user.name}', '${user.email}', '${user.password}', 3,'${user.place}')`
  );

  let message = 'Error in creating user';

  if (result.affectedRows) {
    message = 'Registo efectuado com sucesso!';
    // Gerar um token
    const token = jwt.sign(
      { id: result.insertId, name: user.name },
      config.secret, // Use a secret key from your config
      { expiresIn: '12h' } // Token expires in 1 hour
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
    return { message: 'Email já existe' };
  }

  const result = await db.query(
    `UPDATE app_clients 
      SET user_name="${user.name}", user_password=${user.pass}, user_email=${user.mail}, 
      user_logo=${user.logo}
      WHERE user_id=${id}`
  );

  let message = 'Error in updating user';

  if (result.affectedRows) {
    message = 'User updated successfully';
  }

  return { message };
}


async function remove(id) {
  const result = await db.query(
    `DELETE FROM app_clients WHERE user_id=${id}`
  );

  let message = 'Error in deleting user';

  if (result.affectedRows) {
    message = 'User deleted successfully';
  }

  return { message };
}



module.exports = {
  getclients,
  login,
  registerCliente,
  update,
  remove,
}
