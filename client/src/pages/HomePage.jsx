import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginOrSignupPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      navigate("/books");
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-lg rounded px-10 py-8">
        <h2 className="text-2xl font-bold mb-4">Login or Signup to Continue</h2>
        <div className="flex justify-center">
          <Link
            to="login"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4"
          >
            Login
          </Link>
          <Link
            to="signup"
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginOrSignupPage;
