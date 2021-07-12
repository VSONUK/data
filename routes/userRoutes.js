const userRoutes = require("express").Router();

const { signUp, signIn } = require("../controllers");

userRoutes.post("/signup", signUp);
userRoutes.post("/signin", signIn);

module.exports = userRoutes;
