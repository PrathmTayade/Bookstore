import axios from "axios";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      // send the credentials
      const res = await axios.post(import.meta.env.VITE_SERVER + "/signup", {
        name: name,
        email: email,
        password: password,
      });

      // toast the login
      console.log(res);
      // toast.success(data.message);

      setTimeout(() => {
        navigate("/");
      }, 2500);
    } catch (error) {
      console.log(error);
      await toast.error(error.response.data.message);
    }
  };

  return (
    <main className="form-container">
      <div>
        <Toaster toastOptions={{ duration: 2000 }} />
      </div>
      <h2>Signup</h2>
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <label htmlFor="text">Name</label>
          <input
            type="text"
            id="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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

        <button type="submit">Signup</button>
      </form>
    </main>
  );
};

export default SignUpPage;
