import { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // Form submision
  const handleLogin = async (e) => {
    e.preventDefault();

    // axios implementation
    try {
      const username = email;
      const password =
        "$2b$12$/E0c6Yz1X9qsp7PPrkQW8.YKsMwb.7WZCRC8LRde/RjCnpoSajp6m";
      // send the credentials
      const res = await axios.post(import.meta.env.VITE_SERVER + "/login", {
        username,
        password,
      });
      console.log(res);

      // toast the login
      // toast.success(data.message);

      setTimeout(() => {
        navigate("/");
      }, 2500);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <main>
      {/* Toast notification */}
      <div>
        <Toaster toastOptions={{ duration: 2000 }} />
      </div>
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </main>
  );
}

export default LoginPage;
