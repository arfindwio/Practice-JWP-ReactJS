const path = require("path");

const prisma = require("../libs/prismaClient");
const catchAsync = require("../utils/catchAsync");
const { CustomError } = require("../utils/errorHandler");
const imagekit = require("../libs/imagekit");
const { formattedDate } = require("../utils/formattedDate");

module.exports = {
  // Controller to update user profile information
  updateProfile: catchAsync(async (req, res, next) => {
    try {
      const { fullName, phoneNumber } = req.body;

      // Validation checks for mandatory fields
      if (!fullName || !phoneNumber) throw new CustomError(400, "Please provide fullName, and phoneNumber ");

      // Validation check for full name length
      if (fullName.length > 50) throw new CustomError(400, "Invalid full name length. It must be at most 50 characters.");

      // Validation checks for phone number format and length
      if (phoneNumber) {
        if (!/^\d+$/.test(phoneNumber)) throw new CustomError(400, "Invalid phone number format. It must contain only numeric characters.");

        if (phoneNumber.length < 10 || phoneNumber.length > 12) throw new CustomError(400, "Invalid phone number length. It must be between 10 and 12 characters.");
      }

      // Update user profile in the database
      const newUserProfile = await prisma.userProfile.update({
        where: {
          userId: Number(req.user.id),
        },
        data: {
          fullName,
          phoneNumber,
          updatedAt: formattedDate(new Date()),
        },
      });

      delete newUserProfile.id;
      delete newUserProfile.userId;

      res.status(200).json({
        status: true,
        message: "Profile updated successfully",
        data: { newUserProfile },
      });
    } catch (err) {
      next(err);
    }
  }),
};
