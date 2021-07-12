const mongoose = require("mongoose");

// database connection
mongoose
  .connect("mongodb://localhost:27017/teamChat", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch(() => {
    console.log("Database connection failed");
  });

module.exports = mongoose;
