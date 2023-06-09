import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Cart from "../components/Cart";
import { useState } from "react";

const Layout = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [open, setOpen] = useState(false);

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
        <div>
          <div>please login or signup to contin</div>
          <button onClick={() => navigate("login")}>login</button>
        </div>
      )}
    </>
  );
};

export default Layout;
