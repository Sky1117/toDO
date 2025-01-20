const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5001;
const URI = process.env.MongoDBURI;
try {
  mongoose.connect(URI);
  console.log("Connected to MongoDB");
} catch (error) {
  console.log("Error", error);
}
// Import routes
require("./routes/user.routes")(app);
require("./routes/task.routes")(app);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
