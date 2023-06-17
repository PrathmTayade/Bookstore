import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import BookStore from "./pages/BookStore";
import { store } from "./redux/store";
import Layout from "./pages/Layout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "books",
          element: <BookStore />,
        },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "signup",
      element: <SignUpPage />,
    },
  ]);

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
