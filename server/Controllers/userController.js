// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");
// const cron = require('node-cron');
// const { Op } = require("sequelize"); // For Sequelize operators
// const { asyncHandler } = require("../utils/asyncHandler.js");
// const { ApiResponse } = require("../utils/ApiResponse.js");
// const { ApiError } = require("../utils/ApiError.js");
// const { User } = require("../modals/userModel"); // Assuming User is imported from Sequelize models

// const generateAccessAndRefreshTokens = async (userId) => {
//     try {
//         const user = await User.findByPk(userId);
//         const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//             expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY,
//         });
//         const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//             expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY,
//         });
//         user.refreshToken = refreshToken;
//         await user.save();
//         return { accessToken, refreshToken };
//     } catch (error) {
//         throw new ApiError(500, "Error generating tokens");
//     }
// };

// const registerUser = asyncHandler(async (req, res) => {
//     const { email, username, password } = req.body;

//     if ([email, username, password].some((field) => field.trim() === "")) {
//         throw new ApiError(400, "All fields are required");
//     }

//     const existingUser = await User.findOne({
//         where: { [Op.or]: [{ email }, { username }] },
//     });

//     if (existingUser) {
//         throw new ApiError(409, "User with this email or username already exists");
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//         ...req.body,
//         password: hashedPassword,
//     });

//     const createdUser = await User.findByPk(user.id, {
//         attributes: { exclude: ["password", "refreshToken"] },
//     });

//     res.status(201).json(
//         new ApiResponse(201, createdUser, "User registered successfully")
//     );
// });

// const login = asyncHandler(async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         throw new ApiError(400, "All fields are required");
//     }

//     const user = await User.findOne({ where: { email } });

//     if (!user || !(await bcrypt.compare(password, user.password))) {
//         throw new ApiError(401, "Invalid credentials");
//     }

//     const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user.id);

//     res.status(200).json(
//         new ApiResponse(200, { user, accessToken, refreshToken }, "Login successful")
//     );
// });

// const getUser = asyncHandler(async (req, res) => {
//     const user = await User.findByPk(req.user.id, {
//         attributes: { exclude: ["password", "refreshToken"] },
//     });

//     if (!user) {
//         throw new ApiError(404, "User not found");
//     }

//     res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
// });

// const logoutUser = asyncHandler(async (req, res) => {
//     await User.update(
//         { refreshToken: null },
//         { where: { id: req.user.id } }
//     );

//     res.status(200).json(new ApiResponse(200, {}, "User logged out successfully"));
// });

// const getTrimName = asyncHandler(async (req, res) => {
//     const { full_name } = req.body;
//     const trimmedName = full_name.replace(/\s+/g, ' ').trim();
//     const parts = trimmedName.split(" ");
//     const result = {
//         first_name: parts[0] || "",
//         middle_name: parts.length > 2 ? parts[1] : "",
//         last_name: parts.length > 1 ? parts[parts.length - 1] : "",
//     };

//     res.status(200).json(result);
// });

// const checkEmail = asyncHandler(async (req, res) => {
//     const { email } = req.body;

//     const existingUser = await User.findOne({ where: { email } });

//     if (existingUser) {
//         res.status(400).json({ error: "Email already in use" });
//     } else {
//         res.status(200).json({ message: "Email is available" });
//     }
// });

// const sendOtp = asyncHandler(async (req, res) => {
//     const { email } = req.body;

//     const user = await User.findOne({ where: { email } });

//     if (!user) {
//         throw new ApiError(404, "User not found");
//     }

//     let otp;
//     let isUniqueOtp = false;

//     while (!isUniqueOtp) {
//         otp = `S-${Math.floor(100000 + Math.random() * 900000)}`;
//         const existingOtp = await User.findOne({ where: { otp } });
//         isUniqueOtp = !existingOtp;
//     }

//     await user.update({ otp });

//     const transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 465,
//         secure: true,
//         auth: {
//             user: process.env.OUR_EMAIL,
//             pass: process.env.EMAIL_PASSWORD,
//         },
//     });

//     await transporter.sendMail({
//         from: "no-reply@example.com",
//         to: email,
//         subject: "Your OTP",
//         text: `Your OTP is: ${otp}`,
//     });

//     res.status(200).json(new ApiResponse(200, {}, "OTP sent successfully"));
// });

// const getAllUsers = asyncHandler(async (req, res) => {
//     const users = await User.findAll({
//         attributes: { exclude: ["password", "refreshToken"] },
//     });

//     res.status(200).json(new ApiResponse(200, users, "Users fetched successfully"));
// });

// module.exports = {
//     registerUser,
//     login,
//     getUser,
//     logoutUser,
//     getTrimName,
//     checkEmail,
//     sendOtp,
//     getAllUsers,
// };
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require('../modals/index.js').userModel;
const { Op } = require("sequelize");
const { asyncHandler } = require("../utils/asyncHandler.js");
const { ApiResponse } = require("../utils/ApiResponse.js");
const { ApiError } = require("../utils/ApiError.js");


// Helper function to generate access and refresh tokens
const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findByPk(userId);
        console.log(user,"...................")
        console.log('JWT_SECRET:', process.env.JWT_SECRET);
console.log('TOKEN_EXPIRE_TIME:', process.env.TOKEN_EXPIRE_TIME);

        const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRE_TIME,
        });
        console.log(accessToken,".............")
        // const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        //     expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY,
        // });
        // Save refresh token in the user model
        
        return { accessToken };
    } catch (error) {
        throw new ApiError(500, "Error generating tokens");
    }
};

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;

    if ([email, username, password].some((field) => field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({
        where: { [Op.or]: [{ email }, { username }] },
    });

    if (existingUser) {
        throw new ApiError(409, "User with this email or username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        ...req.body,
        password: hashedPassword,
    });

    const createdUser = await User.findByPk(user.id, {
        attributes: { exclude: ["password", "refreshToken"] },
    });

    res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    );
});

// Login a user and generate tokens
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new ApiError(401, "Invalid credentials");
    }

    const { accessToken  } = await generateAccessAndRefreshTokens(user.id);

    res.status(200).json(
        new ApiResponse(200, { user, accessToken,  }, "Login successful")
    );
});

// Fetch the details of the logged-in user
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ["password", "refreshToken"] },
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
});

// Logout a user and clear the refresh token
const logoutUser = asyncHandler(async (req, res) => {
    await User.update(
        { refreshToken: null },
        { where: { id: req.user.id } }
    );

    res.status(200).json(new ApiResponse(200, {}, "User logged out successfully"));
});

// Trim the name into first, middle, and last names
const getTrimName = asyncHandler(async (req, res) => {
    const { full_name } = req.body;
    const trimmedName = full_name.replace(/\s+/g, ' ').trim();
    const parts = trimmedName.split(" ");
    const result = {
        first_name: parts[0] || "",
        middle_name: parts.length > 2 ? parts[1] : "",
        last_name: parts.length > 1 ? parts[parts.length - 1] : "",
    };

    res.status(200).json(result);
});

// Check if the email is already in use
const checkEmail = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
        res.status(400).json({ error: "Email already in use" });
    } else {
        res.status(200).json({ message: "Email is available" });
    }
});

// Send OTP to the user's email for verification
const sendOtp = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    let otp;
    let isUniqueOtp = false;

    while (!isUniqueOtp) {
        otp = `S-${Math.floor(100000 + Math.random() * 900000)}`;
        const existingOtp = await User.findOne({ where: { otp } });
        isUniqueOtp = !existingOtp;
    }

    await user.update({ otp });

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.OUR_EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    await transporter.sendMail({
        from: "no-reply@example.com",
        to: email,
        subject: "Your OTP",
        text: `Your OTP is: ${otp}`,
    });

    res.status(200).json(new ApiResponse(200, {}, "OTP sent successfully"));
});

// Get a list of all users (without sensitive info like password and refreshToken)
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.findAll({
        attributes: { exclude: ["password", "refreshToken"] },
    });

    res.status(200).json(new ApiResponse(200, users, "Users fetched successfully"));
});

module.exports = {
    registerUser,
    login,
    getUser,
    logoutUser,
    getTrimName,
    checkEmail,
    sendOtp,
    getAllUsers,
};
