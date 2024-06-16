const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = require("../libs/prismaClient");
const catchAsync = require("../utils/catchAsync");
const { CustomError } = require("../utils/errorHandler");
const { formattedDate } = require("../utils/formattedDate");

const { JWT_SECRET_KEY } = process.env;

module.exports = {
  // Controller for user registration
  register: catchAsync(async (req, res, next) => {
    try {
      let { fullName, email, phoneNumber, password } = req.body;
      const passwordValidator = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,12}$/;
      const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Validate required fields
      if (!fullName || !email || !phoneNumber || !password) throw new CustomError(400, "All fields are required.");

      // Validate full name length
      if (fullName.length > 50) throw new CustomError(400, "Invalid full name length. It must be at most 50 characters.");

      // Check for existing user with the same email or phone number
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{ email }, { userProfile: { phoneNumber } }],
        },
      });

      if (existingUser) throw new CustomError(409, "Email or phone number already exists");

      // Validate email format
      if (!emailValidator.test(email)) throw new CustomError(400, "Invalid email format.");

      // Validate phone number format
      if (!/^\d+$/.test(phoneNumber)) throw new CustomError(400, "Invalid phone number format. It must contain only numeric characters.");

      // Validate phone number length
      if (phoneNumber.length < 10 || phoneNumber.length > 12) throw new CustomError(400, "Invalid phone number length. It must be between 10 and 12 characters.");

      // Validate password format
      if (!passwordValidator.test(password)) throw new CustomError(400, "Invalid password format. It must contain at least 1 lowercase, 1 uppercase, 1 digit number, 1 symbol, and be between 8 and 12 characters long.");

      // Encrypt user password
      let encryptedPassword = await bcrypt.hash(password, 10);

      // Create new user and user profile records
      let newUser = await prisma.user.create({
        data: {
          email,
          password: encryptedPassword,
          createdAt: formattedDate(new Date()),
          updatedAt: formattedDate(new Date()),
        },
      });

      await prisma.userProfile.create({
        data: {
          fullName,
          phoneNumber,
          userId: newUser.id,
          createdAt: formattedDate(new Date()),
          updatedAt: formattedDate(new Date()),
        },
      });

      delete newUser.id;
      delete newUser.role;

      res.status(201).json({
        status: true,
        message: "Registration successful",
        data: { newUser },
      });
    } catch (err) {
      next(err);
    }
  }),

  // Controller for user login
  login: catchAsync(async (req, res, next) => {
    try {
      let { emailOrPhoneNumber, password } = req.body;

      // Find user record based on email or phone number
      const user = await prisma.user.findFirst({
        where: {
          OR: [{ email: emailOrPhoneNumber }, { userProfile: { phoneNumber: emailOrPhoneNumber } }],
        },
      });

      // Return error if user not found
      if (!user) throw new CustomError(401, "Invalid Email or Password!");

      // Check if the provided password is correct
      let isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) throw new CustomError(401, "Invalid Email or Password!");

      // Generate JWT token for authentication
      let token = jwt.sign({ id: user.id }, JWT_SECRET_KEY, {
        expiresIn: "6h",
      });

      delete user.id;
      delete user.role;

      return res.status(200).json({
        status: true,
        message: "Login successful",
        data: { user, token },
      });
    } catch (err) {
      next(err);
    }
  }),

  // Controller to authenticate a user based on their ID
  authenticateUser: catchAsync(async (req, res, next) => {
    try {
      // Find the user based on their ID and include their profile information
      const user = await prisma.user.findUnique({
        where: { id: Number(req.user.id) },
        include: {
          userProfile: true,
        },
      });

      // Return error if user not found
      if (!user) throw new CustomError(404, "User not found");

      delete user.userProfile.id;
      delete user.userProfile.userId;

      return res.status(200).json({
        status: true,
        message: "Authentication successful",
        data: { user },
      });
    } catch (err) {
      next(err);
    }
  }),

  getAllUsers: catchAsync(async (req, res, next) => {
    try {
      const users = await prisma.user.findMany();

      return res.status(200).json({
        status: true,
        message: "Get All Users successful",
        data: { users },
      });
    } catch (err) {
      next(err);
    }
  }),
};
