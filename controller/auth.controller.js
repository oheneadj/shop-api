const User = require('../model/user.model');
const jwt = require('jsonwebtoken');

const {loginSchema, registerSchema } = require('../utils/validation')

// Import BcrytJS
const bcrypt = require('bcryptjs');

// Use JOI to validate user registration input
const register = async(req, res) => {

    const { value, error} = registerSchema.validate(req.body);
    console.log(value)
    // Check for error with JOI and return it 
    if(error){
      return res.status(400).json(error.message);  
    }

    // Check database for user with email, if it already exits
    let user = await User.findOne({email:value.email});


    if (user){
        return res.status(409).json({msg: "Email already in use"})
    }

    // Hash Password with Bcrypt
    const hashedPassword = await bcrypt.hash(value.password,10);

    // Create user in database
    user = await User.create({
        username: value.username,
        email: value.email,
        password:hashedPassword
    });
    res.status(201).json(user);
};

// Use JOI to validate user login input

const login = async (req, res) => {
    // Validtae user input
    const { value, error} = loginSchema.validate(req.body);
    // Check for error with JOI and return it 
    if (error){
        return res.status(400).json(error);
    }

   // Check if user with the email is in the database
   let user = await User.findOne({email: value.email});

   // If user is not in the database
   if(!user){
       return res.status(400).json({msg: "Invalid User Credentials"})
   }

   // Check if the login password and the userpassword in the database are the same
   const isMatch = await bcrypt.compare(value.password, user.password);

   if (!isMatch) {
    return res.status(400).json({msg: "Invalid User Credentials"})
   }

   // Generate Token
   const token = jwt.sign({
       // Payload or Object
       id: user._id,
       username: user.username},
        // Secret key used to encode the payload
        "secret",
        // Options
        {
            expiresIn: "1h"
        })

    res.status(201).json(token);
}

module.exports = { register, login}