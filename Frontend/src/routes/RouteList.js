import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Componenet
import { TokenProtected } from "../assets/components/protected/TokenProtected";

// Pages
import { Error404 } from "../pages/errors/Error404";
import { Home } from "../pages/Home";
import { Login } from "../pages//user/auth/Login";
import { Register } from "../pages/user/auth/Register";
import { History } from "../pages/user/account/History";

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
      </Routes>
    </BrowserRouter>
  );
};
