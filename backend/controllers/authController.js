const User=require("../model/User")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const sendEmail=require("../utils/sendEmail")

const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '7d'})
}

//register new user
const registerUser = async(req,res) =>{
    const {name,email,password}= req.body;

    try {
        const existingUser= await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"user already exists"})
        }
        //TODOS:hash the password before saving to database
        //TODOS:implement jwt token generation for authentication
        //TODOS:OTP sending and email verification for email confirmation
        //TODOS:welcome mail

        const salt= await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt);

        const user= await User.create({name,email,password:hashedPassword});
        if(user){
            const otp=Math.floor(100000 + Math.random()*900000).toString();

            const message=`welcome to shopnes, ${name} 
            your otp for shopnest is ${otp}`

            await sendEmail(email,'welcome to shopnest - your otp for registration',message);

            res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
                token:generateToken(user._id)
            });
        }else{
            res.status(400).json({message:'invalid user data'})
        }

    } catch (error) {
    console.log(error);
    res.status(500).json({
        message: error.message
    });
}
};

//login user
const loginUser = async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await User.findOne({email})
        if(user && (await bcrypt.compare(password,user.password))){
            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
                token:generateToken(user._id)
            });
        }else{
            res.status(400).json({message:'Invalid email or password'});
        }
    } catch (error) {
        res.status(500).json({message:'Server error'})
    }
};

//get users
const getUsers = async(req,res)=>{
    try {
        const users = await User.find({}).select("-password")
        res.json(users);
    } catch (error) {
        res.status(500).json({message:'server error'})
    }
};

module.exports={
    registerUser,
    loginUser,
    getUsers
}



