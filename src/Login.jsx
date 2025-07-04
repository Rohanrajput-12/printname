import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy authentication (replace with real API later)
    if (email === "radha@r.com" && password === "radha123") {
      localStorage.setItem("auth", "true");
      navigate("/app");
    } else {
      alert("Invalid credentials ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100">
      <form
        onSubmit={handleLogin}
        className="w-80 bg-white p-6 rounded-2xl shadow-xl flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center text-purple-600">
          🔐 Login to Access
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 border rounded-xl focus:outline-purple-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 border rounded-xl focus:outline-purple-500"
        />

        <button
          type="submit"
          className="bg-purple-600 text-white py-2 rounded-xl font-semibold hover:bg-purple-700"
        >
          🚀 Login
        </button>
      </form>
    </div>
  );
}

export default Login;
