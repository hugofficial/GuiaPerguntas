const sequelize = require("sequelize");
const connection = new sequelize("perguntasguia", "oniloguh", "-5d-2NQTxf", {
  host: "mysql669.umbler.com",
  dialect: "mysql"
});
//alter user 'root'@'localhost' identified with mysql_native_password by 'root';
module.exports = connection;
