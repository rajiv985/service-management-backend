// import User from "../models/user.model.js" 
// import bcrypt from "bcrypt"
// import { ApiError } from "../utils/apiError.js";
// import ApiResponse from "../utils/apiResponse.js";

// // register ko lagi gareko 
// const register = async (req, res, next) => { 
//   try {
//     console.log(req.body);
//     const { firstName,phoneNumber, email,password } = req.body;

//     if ([firstName,phoneNumber, email, password].some((field) => !field || field.trim() === "")) {
//       return next(new ApiError(400, "All fields are required")); 
//     }

//     const existingUser = await User.findOne({ 
//       $or: [{ email }, { phoneNumber }] 
//     });
//     if (existingUser) {  
//       const errorField = existingUser.email === email ? "Email" : "Phone number"; 
//       return next(new ApiError(400, `${errorField} already exists`)); 
//     }  

//     const hashedpassword = await bcrypt.hash(password, 10);

//     if (!hashedpassword) { 
//       return next(new ApiError(400, "Error in creating hashed password"));
//     }

//     await new User({
//       firstName,
//       phoneNumber,
//       email,
//       password: hashedpassword,
//     }).save();                               

//     res.status(201).json(new ApiResponse(201, "User registered successfully"));

//   } catch (error) {
//     console.error("Error during registration:", error);
//     return next(new ApiError(500, "Error during registration"));
//   }
// }; 
 

// const login = async (req, res,next) => {
//     try {
//       const { email, password } = req.body; 
  
//       console.log(req.body);
//       if ([ email, password].some((field) => !field || field.trim() === "")) {
//         return next(new ApiError(400, "All fields are required"));
//       }
  
     
//       const user = await User.findOne({ email });  
      
  
//       if (!user) { 
        
//         return next(new ApiError(400, "User not found or credentials are incorrect"));  
//       }  
  
     
  
//       const isPasswordValid = await bcrypt.compare(password, user.password);  
//       console.log(isPasswordValid);
//       if (!isPasswordValid) {  
//         return next(new ApiError(400, "wrong password")); 
       
//       } 
  
        
  
//     } catch (error) {
//       console.error('Error during login:', error);
//       throw new ApiError(500, "error during login");
//     }
//   };  

//   export{register,login}