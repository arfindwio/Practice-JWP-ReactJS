import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

// Components
import { AdminSidebar } from "../../assets/components/admin/AdminSidebar";
import { AdminNavbar } from "../../assets/components/admin/AdminNavbar";

// Redux Actions
import {
  getAllOrdersAction,
  putEditOrderByIdAction,
} from "../../redux/action/orders/OrdersAction";

// Helper
import {
  showSuccessToast,
  showLoadingToast,
  showErrorToast,
} from "../../helper/ToastHelper";

export const AdminManageOrders = () => {
  const dispatch = useDispatch();
  const orderData = useSelector((state) => state.orders.orders);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllOrdersAction());
    };

    fetchData();
  }, [dispatch]);

  const handleEditOrder = async (e, orderId) => {
    const newStatus = e.target.value;

    const loadingToastId = showLoadingToast("Loading...");

    const editedOrder = await dispatch(
      putEditOrderByIdAction({ status: newStatus }, orderId),
    );

    toast.dismiss(loadingToastId);

    if (!editedOrder) {
      showErrorToast("Order Failed");
    } else {
      showSuccessToast("Order Successful");
    }
  };

  return (
    <div className="flex w-full">
      <div className="flex h-screen w-[22%] flex-col bg-[#6295A2] text-white">
        <AdminSidebar />
      </div>
      <div className="flex w-[78%] flex-col gap-8 bg-slate-100">
        <AdminNavbar />
        <div className="flex flex-col flex-wrap gap-1 px-5">
          <h5 className="mb-3 text-lg font-medium">Manage Orders</h5>
          <table className="min-w-full border-collapse border">
            <thead className="bg-slate-300">
              <tr>
                <th className="border py-2">No</th>
                <th className="border py-2">Package Name</th>
                <th className="border py-2">Price</th>
                <th className="border py-2">Name</th>
                <th className="border py-2">Email</th>
                <th className="border py-2">Phone Number </th>
                <th className="border py-2">Wedding Date</th>
                <th className="border py-2">Status</th>
              </tr>
            </thead>
            <tbody className="border-collapse border">
              {orderData.length > 0 ? (
                orderData.map((order, index) => (
                  <tr key={order.id}>
                    <td className="border px-2 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border px-2 py-2 text-center">
                      {order.service.packageName}
                    </td>
                    <td className="border px-2 py-2 text-center">
                      IDR {order.service.price.toLocaleString()}
                    </td>
                    <td className="border px-2 py-2 text-center">
                      {order.user.userProfile.fullName}
                    </td>
                    <td className="border px-2 py-2 text-center">
                      {order.user.email}
                    </td>
                    <td className="border px-2 py-2 text-center">
                      {order.user.userProfile.phoneNumber}
                    </td>
                    <td className="border px-2 py-2 text-center">
                      {order.weddingDate}
                    </td>
                    <td className="border px-2 py-2 text-center">
                      <form>
                        <select
                          name="status"
                          value={order.status}
                          onChange={(e) => handleEditOrder(e, order.id)}
                          className="rounded-md px-2 py-1"
                        >
                          <option value="requested">Requested</option>
                          <option value="approved">Approved</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </form>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-2 text-center">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
