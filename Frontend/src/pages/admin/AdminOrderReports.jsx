import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import { AdminSidebar } from "../../assets/components/admin/AdminSidebar";
import { AdminNavbar } from "../../assets/components/admin/AdminNavbar";

// Redux Actions
import { getAllOrdersAction } from "../../redux/action/orders/OrdersAction";

export const AdminOrderReports = () => {
  const dispatch = useDispatch();
  const orderData = useSelector((state) => state.orders.orders);

  const requestedOrders = orderData.filter(
    (order) => order.status === "requested",
  ).length;
  const approvedOrders = orderData.filter(
    (order) => order.status === "approved",
  ).length;

  const priceOrder = orderData.length > 0 ? orderData[0].service.price : null;

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllOrdersAction());
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="flex w-full">
      <div className="flex h-screen w-[22%] flex-col bg-[#6295A2] text-white">
        <AdminSidebar />
      </div>
      <div className="flex w-[78%] flex-col gap-8 bg-slate-100">
        <AdminNavbar />
        <div className="flex flex-col flex-wrap gap-4 px-5">
          <h5 className="mb-3 text-lg font-medium">Order Reports</h5>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col justify-center gap-2">
              <h5 className="text-center font-medium">
                Total Orders (Requested):
              </h5>
              <div className="flex justify-center rounded-md border-2 shadow-sm">
                <div className="flex w-1/2 flex-col justify-center border px-4 text-center">
                  <p>Quantity</p>
                  <p className="text-slate-400">{requestedOrders}</p>
                </div>
                <div className="flex w-1/2 flex-col justify-center border px-4 text-center">
                  <p>Total Price</p>
                  <p className="text-slate-400">
                    IDR {(requestedOrders * priceOrder).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center gap-2">
              <h5 className="text-center font-medium">
                Total Orders (Approved):
              </h5>
              <div className="flex justify-center rounded-md border-2 shadow-sm">
                <div className="flex w-1/2 flex-col justify-center border px-4 text-center">
                  <p>Quantity</p>
                  <p className="text-slate-400">{approvedOrders}</p>
                </div>
                <div className="flex w-1/2 flex-col justify-center border px-4 text-center">
                  <p>Total Price</p>
                  <p className="text-slate-400">
                    IDR {(approvedOrders * priceOrder).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
