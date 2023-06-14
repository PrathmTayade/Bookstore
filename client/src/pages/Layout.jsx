import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Cart from "../components/Cart";
import { useEffect, useState } from "react";
import LoginOrSignupPage from "./HomePage";

const Layout = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      setisAuthenticated(true);
    } else {
      setisAuthenticated(false);
    }
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <>
          <header>
            <Navbar setOpen={setOpen} />
          </header>
          <main>
            <Cart open={open} setOpen={setOpen} />

            <Outlet />
          </main>
          <footer>made with love by prathamesh</footer>
        </>
      ) : (
        <main>
          <LoginOrSignupPage />
        </main>
      )}
    </>
  );
};

export default Layout;
