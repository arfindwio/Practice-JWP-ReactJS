import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Componenet
import { TokenProtected } from "../assets/components/protected/TokenProtected";
import { AdminProtected } from "../assets/components/protected/AdminProtected";

// Pages
import { Error404 } from "../pages/errors/Error404";
import { Home } from "../pages/Home";
import { Login } from "../pages//user/auth/Login";
import { Register } from "../pages/user/auth/Register";
import { History } from "../pages/user/account/History";
import { AdminDashboard } from "../pages/admin/AdminDashboard";
import { AdminManageServices } from "../pages/admin/AdminManageServices";
import { AdminManageOrders } from "../pages/admin/AdminManageOrders";
import { AdminOrderReports } from "../pages/admin/AdminOrderReports";

export const RouteList = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Error */}
        <Route path="*" element={<Error404 />} />

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Account */}
        <Route
          path="/history"
          element={<TokenProtected element={<History />} />}
        />

        {/* Admin */}
        <Route
          path="/admin/dashboard"
          element={<AdminProtected element={<AdminDashboard />} />}
        />
        <Route
          path="/admin/manage-services"
          element={<AdminProtected element={<AdminManageServices />} />}
        />
        <Route
          path="/admin/manage-orders"
          element={<AdminProtected element={<AdminManageOrders />} />}
        />
        <Route
          path="/admin/order-reports"
          element={<AdminProtected element={<AdminOrderReports />} />}
        />
      </Routes>
    </BrowserRouter>
  );
};
