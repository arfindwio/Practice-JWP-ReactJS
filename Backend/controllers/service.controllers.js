const path = require("path");

const prisma = require("../libs/prismaClient");
const catchAsync = require("../utils/catchAsync");
const { CustomError } = require("../utils/errorHandler");
const imagekit = require("../libs/imagekit");
const { formattedDate } = require("../utils/formattedDate");

module.exports = {
  getAllServices: catchAsync(async (req, res, next) => {
    try {
      const services = await prisma.service.findMany();

      res.status(200).json({
        status: true,
        message: "show all services successful",
        data: { services },
      });
    } catch (err) {
      next(err);
    }
  }),

  createService: catchAsync(async (req, res, next) => {
    try {
      const { packageName, price, description, isPublish } = req.body;
      const file = req.file;
      let imageURL;

      if (!packageName || !price || !description || !isPublish || !file) throw new CustomError(400, "Please provide packageName, price, description, and isPublish");

      if (file) {
        const strFile = file.buffer.toString("base64");

        const { url } = await imagekit.upload({
          fileName: Date.now() + path.extname(req.file.originalname),
          file: strFile,
        });

        imageURL = url;
      }

      let newService = await prisma.service.create({
        data: {
          serviceImage: imageURL,
          packageName,
          price: Number(price),
          description,
          isPublish: Boolean(isPublish),
          createdAt: formattedDate(new Date()),
          updatedAt: formattedDate(new Date()),
        },
      });

      res.status(201).json({
        status: true,
        message: "create service successful",
        data: { newService },
      });
    } catch (err) {
      next(err);
    }
  }),

  editServiceById: catchAsync(async (req, res, next) => {
    try {
      const { serviceId } = req.params;
      const { packageName, price, description, isPublish } = req.body;
      const file = req.file;
      let imageURL;

      if (!packageName || !price || !description || !isPublish || !file) throw new CustomError(400, "Please provide packageName, price, description, and isPublish");

      const service = await prisma.service.findUnique({
        where: { id: Number(serviceId) },
      });

      if (!service) throw new CustomError(404, "service Not Found");

      if (file) {
        const strFile = file.buffer.toString("base64");

        const { url } = await imagekit.upload({
          fileName: Date.now() + path.extname(req.file.originalname),
          file: strFile,
        });

        imageURL = url;
      }

      let editedService = await prisma.service.update({
        where: {
          id: Number(service.id),
        },
        data: {
          serviceImage: imageURL,
          packageName,
          price: Number(price),
          description,
          isPublish: Boolean(isPublish),
          updatedAt: formattedDate(new Date()),
        },
      });

      res.status(200).json({
        status: true,
        message: "update service successful",
        data: { editedService },
      });
    } catch (err) {
      next(err);
    }
  }),

  deleteServiceById: catchAsync(async (req, res, next) => {
    try {
      const { serviceId } = req.params;

      const service = await prisma.service.findUnique({
        where: { id: Number(serviceId) },
      });

      if (!service) throw new CustomError(404, "Service Not Found");

      const deletedService = await prisma.service.delete({
        where: {
          id: Number(service.id),
        },
      });

      res.status(200).json({
        status: true,
        message: "delete service successful",
        data: { deletedService },
      });
    } catch (err) {
      next(err);
    }
  }),
};
