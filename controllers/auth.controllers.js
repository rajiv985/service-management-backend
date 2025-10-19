import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";

// token genarate garna ko lagi 
const generateTokens = (user) => {
  const accessToken = jwt.sign(
    {
      data: { id: user._id, role: user.role }, 
    },
    process.env.ACCESS_TOKEN_SECRET, 
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    {
      data: { id: user._id },
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
}; 

// register ko lagi 
const register = async (req, res, next) => {
  try {
    console.log(req.body);
    const { fullName, phoneNumber, email, password, dob, visaType } = req.body;

    if ([fullName, phoneNumber, email, password, dob, visaType].some(field => !field || field.trim?.() === "")) {
      return next(new ApiError(400, "All fields are required"));
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { phoneNumber }]
    });

    if (existingUser) {
      const errorField = existingUser.email === email ? "Email" : "Phone number";
      return next(new ApiError(400, `${errorField} already exists`));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      phoneNumber,
      email,
      password: hashedPassword,
      dob,
      visaType,
    });

    await newUser.save();

    res.status(201).json(
      new ApiResponse(201, "User registered successfully", {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      })
    );

  } catch (error) {
    console.error("Error during registration:", error);
    return next(new ApiError(500, "Error during registration"));
  }
};


// login ko lagi 
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if ([email, password].some(field => !field || field.trim?.() === "")) {
      return next(new ApiError(400, "All fields are required"));
    }

    const user = await User.findOne({ email });

    if (!user) {
      return next(new ApiError(400, "User not found or credentials are incorrect"));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new ApiError(400, "Wrong password"));
    }


    const { accessToken, refreshToken } = generateTokens(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, 
    });

  
    res.status(200).json(
      new ApiResponse(200, "Login successful", {
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        },
        tokens: {
          accessToken,
          refreshToken,
        },
      })
    );

  } catch (error) {
    console.error("Error during login:", error);
    return next(new ApiError(500, "Error during login"));
  }
};

export { register, login };
