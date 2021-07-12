const bcrypt = require("bcrypt");

const { userDetailsModel } = require("../model");

const signUp = async (req, res) => {
  try {
    const { name, emailId, password } = req.body;
    const userExist = await userDetailsModel.findOne({ emailId });
    const salt = await bcrypt.genSalt(10);
    hashPass = await bcrypt.hash(password, salt);
    if (!userExist) {
      const user = new userDetailsModel({ name, emailId, password: hashPass });
      let newUser = await user.save();
      newUser = newUser.toObject();
      newUser.password = null;

      res
        .status(200)
        .json({ success: true, data: newUser, message: "Successful SignUp" });
    } else {
      res.status(400).json({ message: "User already exist" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const signIn = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    let userExist = await userDetailsModel.findOne({ emailId });
    if (userExist) {
      const isValidPassword = await bcrypt.compareSync(
        password,
        userExist.password
      );
      if (isValidPassword) {
        userExist = userExist.toObject();
        userExist.password = null;
        res.status(200).json({
          success: true,
          data: userExist,
          message: "Successful SignIn",
        });
      } else {
        res.status(403).json({
          success: false,
          message: "User Name and password not match",
        });
      }
    } else {
      res.status(403).json({ success: false, message: "User Name not exist!" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = {
  signUp,
  signIn,
};
