const taskController = require("../controller/task.controller");
const authenticate = require("../middleware/auth");

module.exports = function (app) {
  app.post("/api/tasks", authenticate, taskController.createTask);
  app.get("/api/tasks", authenticate, taskController.getTasks);
  app.put("/api/tasks/:id", authenticate, taskController.updateTask);
  app.delete("/api/tasks/:id", authenticate, taskController.deleteTask);
  app.get(
    "/api/tasks/:username",
    authenticate,
    taskController.getTasksByUsername
  );
};
