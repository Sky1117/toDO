const { signup, login, getUser } = require("../controller/user.controller");

module.exports = function (app) {
  app.post("/api/singup", signup);
  app.post("/api/login", login);
};
