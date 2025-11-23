const express = require("express");
const app = express();
const { sequelize } = require("./models");
const cors = require('cors')

app.use(express.json());
app.use(cors())

// Auth & Employee routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/employees", require("./routes/employees"));

// Teams CRUD & assignments
app.use("/api/teams", require("./routes/teams"));

// Logs
app.use("/api/logs", require("./routes/logs"));

sequelize.sync({ alter: true }).then(() => {
  app.listen(8080, () => console.log("Server running on 8080"));
});
