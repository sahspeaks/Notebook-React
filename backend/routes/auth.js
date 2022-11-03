const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser')

const JWT_SECRET = "Top secret";

//ROUTE 1: Create a user via post router api/auth/createuser
router.post('/createuser', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Enter Strong Password').isLength({ min: 5 }),

], async (req, res) => {
  //if there are errors,return bad request and the error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //check whether the user already exist or not and handle error in try-cath block
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ "error": "User with this email already exists." });
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    //create a new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });
    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({ authToken });
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal server error has occured");
  }
});

//ROUTE 2: Authenticate a user via post router api/auth/login
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'password can not be blank').exists()
], async (req, res) => {
  //if there are errors,return bad request and the error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //collect email password from login page and compare with databse email & password
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Please login with valid credentials" });
    }
    const comparedPassword = await bcrypt.compare(password, user.password);
    if (!comparedPassword) {
      return res.status(400).json({ error: "Please login with valid credentials" });
    }
    //when both email and password is matched  
    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({ authToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal server error has occured");
  }
});

//ROUTE 3: Get logged-in user details  via Post router api/auth/getuser :Login required to get details

router.post('/getuser',fetchuser,async (req, res) => {
  try {

    const userId=req.user.id;
    const user=await User.findById(userId).select("-password");
    
  res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal server error has occured");
  }

});

module.exports = router;