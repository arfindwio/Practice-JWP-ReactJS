import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Redux Actions
import { getOrderHistoryAction } from "../../../redux/action/orders/OrdersAction";

// Components
import { Navbar } from "../../../assets/components/navbar/Navbar";

export const History = () => {
  const dispatch = useDispatch();

  const orderHistoryData = useSelector((state) => state.orders.ordersHistory);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getOrderHistoryAction());
    };

    fetchData();
  }, [dispatch]);

  return (
    <>
      <Navbar />

      <div className="mx-auto px-10 pt-20">
        <h2 className="mb-4 text-2xl font-bold">Order History</h2>
        <table className="min-w-full divide-y divide-gray-200 shadow-md">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Package Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Wedding Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            <tr>
              {orderHistoryData.map((order, index) => (
                <>
                  <td className="whitespace-nowrap px-6 py-4">{index}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {order.service.packageName}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    IDR {order.service.price.toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {order.weddingDate}
                  </td>
                  <td
                    className={`whitespace-nowrap px-6 py-4 font-medium ${
                      order.status === "requested"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {order.status}
                  </td>
                </>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
