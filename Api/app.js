const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: False }));

app.use(bodyParser.json());

// mysql
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "Passw0rd",
  database: "madeiraarte",
});

//get all users
app.get("/users", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log(`Connected as id ${connection.threadId}`);
    /* query teste*/ connection.query("SELECT * FROM client", (err, rows) => {
      connection.release();
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  });
});

//listen on port 3000
app.listen(port, () => console.log(`Listening on port ${port}`));
