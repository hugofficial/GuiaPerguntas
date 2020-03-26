const sequelize = require("sequelize");
const connection = new sequelize("perguntasguia", "root", "root", {
  host: "localhost",
  dialect: "mysql"
});
//alter user 'root'@'localhost' identified with mysql_native_password by 'root';
module.exports = connection;
