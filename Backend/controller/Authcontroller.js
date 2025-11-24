const bcrypt=require("bcrypt")
const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel');
const asyncHandler=require('../Middleware/AsyncHandler')

// REGISTER
exports.registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password){     // Required Validation
        return res.status(400).json({
            success:false,
            message:"All fields are required"
        })
    }

    // check if User already Exists
    const userExist=await User.findOne({email});
    if(userExist){
        return res.status(400).json({
            success:false,
            message:"User Already Exists"
        })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            message:"User register Successfully"
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
});

// User login
exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    if(!email || !password){

        return res.status(400).json({
            success:false,
            message:"Email & Password required"
        })
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            message:"User Logged in Successfully"
        });
    } else {
        res.status(400).json({ message: 'Invalid credentials' });
    }
});

// TOKEN
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '2d' });
};
