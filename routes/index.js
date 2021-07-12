const apiRoutes = require("express").Router();

const userRoutes = require("./userRoutes");

apiRoutes.use("/user", userRoutes);

module.exports = apiRoutes;
