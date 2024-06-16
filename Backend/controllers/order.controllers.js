const prisma = require("../libs/prismaClient");
const catchAsync = require("../utils/catchAsync");
const { CustomError } = require("../utils/errorHandler");
const { formattedDate } = require("../utils/formattedDate");

module.exports = {
  getAllOrders: catchAsync(async (req, res, next) => {
    try {
      const orders = await prisma.order.findMany({
        include: {
          service: {
            select: {
              packageName: true,
              price: true,
            },
          },
          user: {
            select: {
              email: true,
              userProfile: {
                select: {
                  fullName: true,
                  phoneNumber: true,
                },
              },
            },
          },
        },
      });

      res.status(200).json({
        status: true,
        message: "show all orders successful",
        data: { orders },
      });
    } catch (err) {
      next(err);
    }
  }),

  createOrder: catchAsync(async (req, res, next) => {
    try {
      const { weddingDate, serviceId } = req.body;

      if (!weddingDate || !serviceId) throw new CustomError(400, "Please provide weddingDate and serviceId");

      const service = await prisma.service.findUnique({
        where: { id: Number(serviceId) },
      });

      if (!service) throw new CustomError(404, "Service Not Found");

      let newOrder = await prisma.order.create({
        data: {
          weddingDate: formattedDate(new Date()),
          serviceId: Number(service.id),
          userId: req.user.id,
          createdAt: formattedDate(new Date()),
          updatedAt: formattedDate(new Date()),
        },
      });

      delete newOrder.id;
      delete newOrder.serviceId;
      delete newOrder.userId;

      res.status(201).json({
        status: true,
        message: "create order successful",
        data: { newOrder },
      });
    } catch (err) {
      next(err);
    }
  }),

  editOrderById: catchAsync(async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;

      if (!status) throw new CustomError(400, "Please provide status");

      const order = await prisma.order.findUnique({
        where: { id: Number(orderId) },
      });

      if (!order) throw new CustomError(404, "order Not Found");

      let editedOrder = await prisma.order.update({
        where: {
          id: Number(order.id),
        },
        data: {
          status,
          updatedAt: formattedDate(new Date()),
        },
      });

      res.status(200).json({
        status: true,
        message: "update order successful",
        data: { editedOrder },
      });
    } catch (err) {
      next(err);
    }
  }),

  getOrdersHistory: catchAsync(async (req, res, next) => {
    try {
      const orders = await prisma.order.findMany({
        where: { userId: Number(req.user.id) },
        include: {
          service: {
            select: {
              packageName: true,
              price: true,
            },
          },
        },
      });

      delete orders.serviceId;
      delete orders.userId;
      delete orders.updatedAt;

      res.status(200).json({
        status: true,
        message: "show orders history successful",
        data: { orders },
      });
    } catch (err) {
      next(err);
    }
  }),
};
