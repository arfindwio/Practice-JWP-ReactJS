import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

// Redux Actions
import {
  getUserAuthenticateAction,
  logoutUserAction,
} from "../../../redux/action/users/UsersAction";

// Cookie
import { CookiesKeys, CookieStorage } from "../../../utils/cookie";

export const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [navbarClass, setNavbarClass] = useState("bg-transparent");

  const token = CookieStorage.get(CookiesKeys.AuthToken);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        const user = await dispatch(getUserAuthenticateAction());
        if (!user) {
          return await dispatch(logoutUserAction());
        }
      }
    };

    if (location.pathname !== "/history") fetchData();
  }, [token, dispatch, location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setNavbarClass("bg-white shadow-md border-b");
      } else {
        setNavbarClass("bg-transparent");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        id="navbar"
        className={`fixed z-10 flex w-full items-center px-10 py-3 transition-colors duration-300 ${
          location.pathname === "/"
            ? navbarClass
            : "border-b bg-white shadow-md"
        }`}
      >
        <Link to={"/"} className="text-3xl font-bold text-[#B3E2A7]">
          JeWePe
        </Link>
        {token ? (
          <div className="ml-auto flex gap-5">
            <Link
              to={"/history"}
              className="text-lg font-semibold text-slate-400 hover:text-[#B3E2A7]"
            >
              History
            </Link>
            <button
              type="button"
              onClick={() => dispatch(logoutUserAction())}
              className="text-lg font-semibold text-slate-400 hover:text-[#B3E2A7]"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="ml-auto">
            <Link
              to={"/login"}
              className="text-lg font-semibold text-slate-400 hover:text-[#B3E2A7]"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
