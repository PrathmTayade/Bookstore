import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import ErrorPage from "./pages/Error";
import SignUpPage from "./pages/SignUp";
import BookStore from "./pages/BookStore";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "signup",
      element: <SignUpPage />,
    },
    {
      path: "books",
      element: <BookStore />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
