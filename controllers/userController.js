const User = require("../models/User");
const bcrypt = require("bcrypt");

require("dotenv").config();

exports.signup = async (req, res) => {
  console.log("body>>>>>>>>>>>>>>>", req.body);
  const { firstName,lastName,email,phone,password } = req.body;

  try {
    const existingUser = await User.findAll({ where: { email: email } });
    if (existingUser.length > 0) {
      return res.status(400).json({ success: false, error: "Email already exists" });
    }

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, async(err, hash) => {
      try {
        await User.create({firstName,lastName,email,phone, password: hash});
        res.status(200).json({ success: true, message: "Account Created Succesfully!"});
      } catch (error) {
        console.log(error);
      }
    })

  } catch (error) {
    res.status(400).json({ success: false, error: "Server error" });
  }
};

exports.login = async(req, res, next) => {
  console.log("login>>>>>",req.body)
  const { email, password } = req.body;
  try {
    const user = await User.findAll({ where: { email } });
    if(user.length > 0) {
      const userData = user[0].dataValues;
      const hashPassword = userData.password;
      bcrypt.compare(password, hashPassword, (err, result) => {
        if(err) {
          return res.status(400).json({success:false, error: "something went wrong!"})
        }
        if (result) {
          return res.status(200).json({ 
            success: true, 
            message: "Loggedin Succesfully!", 
            name : userData.name,
          })
        }
        else {
          return res.status(400).json({success:false, error: "incorrect password!"})
        }
      }) 
    }
    else {
      return res.status(404).json({success:false, error: "user does not exist, create account"})
    }
  }
  catch(err) {
    res.status(400).json({error:err.message});
  }
};


