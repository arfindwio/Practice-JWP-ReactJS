import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

// Components
import { AdminSidebar } from "../../assets/components/admin/AdminSidebar";
import { AdminNavbar } from "../../assets/components/admin/AdminNavbar";

// Redux Actions
import {
  getAllServicesAction,
  putEditServiceByIdAction,
  deleteServiceByIdAction,
  postCreateServiceAction,
} from "../../redux/action/services/ServicesAction";

// Material Tailwind
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

// Helper
import {
  showLoadingToast,
  showSuccessToast,
  showErrorToast,
} from "../../helper/ToastHelper";

// Icons
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

export const AdminManageServices = () => {
  const dispatch = useDispatch();

  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [inputService, setInputService] = useState({
    image: "",
    packageName: "",
    price: null,
    description: "",
    isPublish: false,
  });
  const [serviceId, setServiceId] = useState(null);

  const serviceData = useSelector((state) => state.services.services);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllServicesAction());
    };

    fetchData();
  }, [dispatch]);

  const handleOpen = (type, serviceId) => {
    setServiceId(serviceId);
    if (type === "delete") {
      setOpenDelete(!openDelete);
    } else if (type === "edit") {
      const filteredData = serviceData.find(
        (service) => service.id === serviceId,
      );
      setInputService({
        image: filteredData.serviceImage,
        packageName: filteredData.packageName,
        price: filteredData.price,
        description: filteredData.description,
        isPublish: filteredData.isPublish,
      });
      setOpenEdit(!openEdit);
    } else if (type === "create") {
      setInputService({
        image: "",
        packageName: "",
        price: null,
        description: "",
        isPublish: false,
      });
      setOpenCreate(!openCreate);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.name === "image") {
      setInputService((prevInputService) => ({
        ...prevInputService,
        image: e.target.files[0],
      }));
    } else if (e.target.name === "isPublish") {
      setInputService((prevInputService) => ({
        ...prevInputService,
        isPublish: JSON.parse(e.target.value),
      }));
    } else {
      setInputService((prevInputService) => ({
        ...prevInputService,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleCreate = async (e) => {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();

      const loadingToastId = showLoadingToast("Loading...");

      const createService = await dispatch(
        postCreateServiceAction(inputService, serviceId),
      );

      toast.dismiss(loadingToastId);

      if (!createService) showErrorToast("Create Service Failed");

      if (createService) {
        showSuccessToast("Create Service Successful");
        await dispatch(getAllServicesAction());
        setOpenCreate(false);
      }
    }
  };

  const handleEdit = async (e) => {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();

      const loadingToastId = showLoadingToast("Loading...");

      console.log(inputService.isPublish);

      const editService = await dispatch(
        putEditServiceByIdAction(inputService, serviceId),
      );

      toast.dismiss(loadingToastId);

      if (!editService) showErrorToast("Edit Service Failed");

      if (editService) {
        showSuccessToast("Edit Service Successful");
        await dispatch(getAllServicesAction());
        setOpenEdit(false);
      }
    }
  };

  const handleDelete = async () => {
    const loadingToastId = showLoadingToast("Loading...");

    const deleteService = await dispatch(deleteServiceByIdAction(serviceId));

    toast.dismiss(loadingToastId);

    if (!deleteService) showErrorToast("Delete Service Failed");

    if (deleteService) {
      showSuccessToast("Delete Service Successful");
      await dispatch(getAllServicesAction());
      setOpenDelete(false);
    }
  };
  return (
    <>
      <div className="flex w-full">
        <div className="flex h-screen w-[22%] flex-col bg-[#6295A2] text-white">
          <AdminSidebar />
        </div>
        <div className="flex w-[78%] flex-col gap-8 bg-slate-100">
          <AdminNavbar />
          <div className="flex flex-col flex-wrap gap-1 px-5">
            <h5 className="mb-3 text-lg font-medium">Manage Services</h5>
            <button
              type="submit"
              className="w-fit rounded-md bg-green-400 px-4 py-2 text-white hover:bg-green-600"
              onClick={() => handleOpen("create", "")}
            >
              Create Service
            </button>
            <table className="min-w-full border-collapse border">
              <thead className="bg-slate-300">
                <tr>
                  <th className="border py-2">No</th>
                  <th className="border py-2">Image</th>
                  <th className="border py-2">Package Name</th>
                  <th className="border py-2">Description</th>
                  <th className="border py-2">Price</th>
                  <th className="border py-2">Status Publish</th>
                  <th className="border py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="border-collapse border">
                {serviceData.length > 0 ? (
                  serviceData.map((service, index) => (
                    <tr key={index}>
                      <td className="border px-2 py-2 text-center">
                        {index + 1}
                      </td>
                      <td className="mx-auto border px-2 py-2">
                        <img
                          src={service.serviceImage}
                          alt={service.serviceName}
                          className="mx-auto h-16 w-16 object-cover"
                        />
                      </td>
                      <td className="border px-2 py-2 text-center">
                        {service.packageName}
                      </td>
                      <td className="border px-2 py-2 text-center">
                        {service.description}
                      </td>
                      <td className="border px-2 py-2 text-center">
                        IDR {service.price}
                      </td>
                      <td className="border px-2 py-2 text-center">
                        {service.isPublish ? "Published" : "Unpublished"}
                      </td>
                      <td className="border px-2 py-2 text-center">
                        <div
                          className="mb-1 mr-1 w-fit rounded-md bg-orange-400 px-3 py-1 text-white hover:bg-orange-700"
                          onClick={() => handleOpen("edit", service.id)}
                        >
                          <button>Edit</button>
                        </div>
                        <div
                          className="w-fit rounded-md bg-red-400 px-3 py-1 text-white hover:bg-red-600"
                          onclick='return confirm("Are you sure you want to delete this service?")'
                        >
                          <button>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colspan="7" className="py-2 text-center">
                      No services found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Material Tailwind */}
      {/* Modal Create */}
      <Dialog
        open={openCreate}
        size={"md"}
        handler={() => setOpenCreate(!openCreate)}
      >
        <DialogHeader className="flex items-center justify-between">
          <h5 className="text-xl font-bold">Create Service</h5>
          <IoMdClose
            size={30}
            className="cursor-pointer"
            onClick={() => setOpenCreate(false)}
          />
        </DialogHeader>
        <DialogBody>
          <form className="flex flex-col gap-4" onKeyDown={handleCreate}>
            <div className="flex w-full flex-col">
              <label htmlFor="image" className="text-neutral-1">
                Service Image
              </label>
              <input
                type="file"
                accept="image/*"
                id="image"
                name="image"
                className="border-1 rounded-2xl border px-4 py-3 text-neutral-2 outline-none"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex w-full flex-col">
              <label htmlFor="packageName" className="text-neutral-1">
                Package Name
              </label>
              <input
                type="text"
                id="packageName"
                name="packageName"
                className="border-1 rounded-2xl border px-4 py-3 text-neutral-2 outline-none"
                placeholder="Input Package Name"
                value={inputService.packageName}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex w-full flex-col">
              <label htmlFor="price" className="text-neutral-1">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                className="border-1 rounded-2xl border px-4 py-3 text-neutral-2 outline-none"
                placeholder="Input Price"
                value={inputService.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex w-full flex-col">
              <label htmlFor="description" className="text-neutral-1">
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                className="border-1 rounded-2xl border px-4 py-3 text-neutral-2 outline-none"
                placeholder="Input Description"
                value={inputService.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex w-full flex-col">
              <label htmlFor="isPublish" className="text-neutral-1">
                Status Publish
              </label>
              <select
                name="isPublish"
                value={inputService.isPublish}
                onChange={handleInputChange}
                className="rounded-md px-2 py-1"
              >
                <option value="true">Published</option>
                <option value="false">Unpublished</option>
              </select>
            </div>
          </form>
        </DialogBody>
        <DialogFooter className="flex items-center justify-center gap-2">
          <button
            type="button"
            className="flex gap-1 rounded-full border border-neutral-1 px-3 py-1 text-neutral-2 hover:border-neutral-3 hover:text-neutral-3"
            onClick={() => setOpenCreate(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="flex gap-1 rounded-full  bg-green-600 px-3 py-1 text-white hover:bg-green-800"
            onClick={handleCreate}
          >
            Create
          </button>
        </DialogFooter>
      </Dialog>

      {/* Modal Edit */}
      <Dialog
        open={openEdit}
        size={"md"}
        handler={() => setOpenEdit(!openEdit)}
      >
        <DialogHeader className="flex items-center justify-between">
          <h5 className="text-xl font-bold">Edit Service</h5>
          <IoMdClose
            size={30}
            className="cursor-pointer"
            onClick={() => setOpenEdit(false)}
          />
        </DialogHeader>
        <DialogBody>
          <form className="flex flex-col gap-4" onKeyDown={handleEdit}>
            <div className="flex w-full flex-col">
              <label htmlFor="image" className="text-neutral-1">
                Service Image
              </label>
              <input
                type="file"
                accept="image/*"
                id="image"
                name="image"
                className="border-1 rounded-2xl border px-4 py-3 text-neutral-2 outline-none"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex w-full flex-col">
              <label htmlFor="packageName" className="text-neutral-1">
                Package Name
              </label>
              <input
                type="text"
                id="packageName"
                name="packageName"
                className="border-1 rounded-2xl border px-4 py-3 text-neutral-2 outline-none"
                placeholder="Input Package Name"
                value={inputService.packageName}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex w-full flex-col">
              <label htmlFor="price" className="text-neutral-1">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                className="border-1 rounded-2xl border px-4 py-3 text-neutral-2 outline-none"
                placeholder="Input Price"
                value={inputService.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex w-full flex-col">
              <label htmlFor="description" className="text-neutral-1">
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                className="border-1 rounded-2xl border px-4 py-3 text-neutral-2 outline-none"
                placeholder="Input Description"
                value={inputService.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex w-full flex-col">
              <label htmlFor="isPublish" className="text-neutral-1">
                Status Publish
              </label>
              <select
                name="isPublish"
                value={inputService.isPublish}
                onChange={handleInputChange}
                className="rounded-md px-2 py-1"
              >
                <option value="true">Published</option>
                <option value="false">Unpublished</option>
              </select>
            </div>
          </form>
        </DialogBody>
        <DialogFooter className="flex items-center justify-center gap-2">
          <button
            type="button"
            className="flex gap-1 rounded-full border border-neutral-1 px-3 py-1 text-neutral-2 hover:border-neutral-3 hover:text-neutral-3"
            onClick={() => setOpenEdit(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="flex gap-1 rounded-full  bg-light-blue-600 px-3 py-1 text-white hover:bg-light-blue-800"
            onClick={handleEdit}
          >
            Save
          </button>
        </DialogFooter>
      </Dialog>

      {/* Modal Delete */}
      {/* <Dialog
        open={openDelete}
        size={"md"}
        handler={() => setOpenDelete(!openDelete)}
      >
        <DialogHeader className="flex justify-end">
          <IoMdClose
            size={30}
            className="cursor-pointer"
            onClick={() => setOpenDelete(false)}
          />
        </DialogHeader>
        <DialogBody className="mx-auto flex w-[80%] flex-col items-center justify-center gap-4 text-center text-lg">
          <RiDeleteBin5Line size={100} className="text-red-800" />
          <p>Are you sure you want to delete this Category?</p>
        </DialogBody>
        <DialogFooter className="flex items-center justify-center gap-2">
          <button
            type="button"
            className="flex gap-1 rounded-full border border-neutral-1 px-3 py-1 text-neutral-2 hover:border-neutral-3 hover:text-neutral-3"
            onClick={() => setOpenDelete(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="flex gap-1 rounded-full  bg-red-600 px-3 py-1 text-neutral-5 hover:bg-red-800"
            onClick={handleDelete}
          >
            Delete
          </button>
        </DialogFooter>
      </Dialog> */}
    </>
  );
};
