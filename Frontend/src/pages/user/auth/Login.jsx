import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

// Icons
import { FiEye, FiEyeOff } from "react-icons/fi";

// Redux Actions
import { postLoginUserAction } from "../../../redux/action/users/UsersAction";

// Helper
import {
  showSuccessToast,
  showLoadingToast,
  showErrorToast,
} from "../../../helper/ToastHelper";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [inputLogin, setInputLogin] = useState({
    emailOrPhoneNumber: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setInputLogin((prevInputLogin) => ({
      ...prevInputLogin,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();

      const loadingToastId = showLoadingToast("Loading...");

      const login = await dispatch(postLoginUserAction(inputLogin));

      toast.dismiss(loadingToastId);

      if (!login) showErrorToast("Login Failed");

      if (login) {
        showSuccessToast("Login Successful");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    }
  };

  return (
    <>
      <div class="flex h-screen items-center justify-center">
        <div class="flex w-[20%] flex-col gap-5 rounded-md border p-5 shadow-lg">
          <h2 class="text-center text-2xl font-bold">LOGIN</h2>
          <form className="flex w-full flex-col gap-4" onKeyDown={handleLogin}>
            <div className="flex w-full flex-col">
              <label htmlFor="emailOrPhoneNumber">Email / Phone Number</label>
              <input
                type="text"
                id="emailOrPhoneNumber"
                name="emailOrPhoneNumber"
                className="border-1 rounded-2xl border px-4 py-3 outline-none"
                placeholder="Email or Phone Number"
                value={inputLogin.emailOrPhoneNumber}
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
            </div>
            <div className="flex w-full flex-col">
              <label htmlFor="password">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="border-1 w-full rounded-2xl border px-4 py-3 pr-14 outline-none"
                  placeholder="Input password"
                  value={inputLogin.password}
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  autoComplete="off"
                />
                {showPassword ? (
                  <FiEye
                    size={27}
                    className="absolute right-4 top-3 w-8 cursor-pointer text-slate-400"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                ) : (
                  <FiEyeOff
                    size={27}
                    className="absolute right-4 top-3 w-8 cursor-pointer text-slate-400"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                )}
              </div>
            </div>
            <button
              className="mt-3 w-full rounded-2xl bg-neutral-1 py-2 text-base font-medium text-neutral-5 hover:bg-opacity-80"
              onClick={handleLogin}
            >
              Login
            </button>
            <div className="mt-1">
              <p className="text-center text-sm">
                Don't have an account?
                <Link
                  to={"/register"}
                  className="text-neu1border-neutral-1 ms-2 font-bold hover:opacity-60"
                >
                  Register here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
