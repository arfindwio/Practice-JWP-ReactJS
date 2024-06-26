const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;

module.exports = async function (req, res, next) {
  try {
    let { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({
        status: false,
        message: "Unauthorized",
        err: "missing token on header!",
        data: null,
      });
    }

    const token = authorization.split("Bearer ")[1];

    const payload = jwt.verify(token, JWT_SECRET_KEY);

    const user = await prisma.user.findUnique({ where: { id: payload.id } });

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "unauthenticated",
        err: "email is not register",
        data: null,
      });
    }

    req.user = user;

    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError" && err.message === "jwt malformed") {
      return res.status(401).json({
        status: false,
        message: "Unauthorized",
        err: "Invalid token",
        data: null,
      });
    }

    next(err);
  }
};
