import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { cartSelector } from "../redux/cartSlice";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Cart from "./Cart";
import { useState } from "react";

export default function Navbar({ setOpen }) {
  const navigate = useNavigate();
  const cart = useSelector(cartSelector);

  const logout = () => {
    localStorage.removeItem("access_token");
    navigate("/home");
    // TODO add logout thankyou page
  };

  return (
    <>
      {/* <div className=" flex h-20 items-center justify-between border-b border-slate-300 bg-white/75 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/75 ">
        <div className="container mx-auto   flex w-full max-w-7xl items-center justify-between px-6">
          <Link to={"/"} className="relative flex items-center  ">
            <span className=" hidden px-2 text-xl font-semibold sm:block">
              Shopcart
            </span>
          </Link>
          <div className="flex items-center gap-2 md:hidden">
            <Link href={"/bookStore"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </Link>
            <div className="relative">
              <Link to={"/cart"}>
                <ShoppingCartIcon onClick={() => setOpen(true)} />
              </Link>

              <div className="absolute top-0 right-0  block h-4 w-4 rounded-full bg-red-600 text-center text-[10px] text-white ">
                {cart.items.length}
              </div>
            </div>
          </div>
          <div className="hidden items-center justify-center gap-4 md:flex">
            <Link to={"/books"}>Shop</Link>
            <ShoppingCartIcon onClick={() => setOpen(true)} />

            <div className=" block h-6 w-6 rounded-full bg-red-400 text-center text-white ">
              {cart.items.length}
            </div>
          </div>
        </div>
      </div> */}

      <div className="flex justify-between p-2 px-4 items-center h-20 bg-slate-800 text-white text-lg font-bold ">
        <h1>Book Store</h1>
        <Link to={"books"}>
          <h2>Shop</h2>
        </Link>

        <button type="button" onClick={logout}>
          logout
        </button>
        <ShoppingCartIcon onClick={() => setOpen(true)} className="h-10 w-10" />
      </div>
    </>
  );
}
