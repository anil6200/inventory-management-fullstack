import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login, reset } from "../features/auth/authSlice";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const { email, password, remember } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) alert(message);
    if (isSuccess || user) navigate("/");
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  if (isLoading) return <div className="text-center mt-20 text-xl font-semibold">Loading...</div>;

  return (
    <div className="min-h-screen w-full bg-gray-50 flex justify-center items-center px-6">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl flex overflow-hidden">
        
        {/* LEFT LOGIN FORM */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          
          <h1 className="text-3xl font-bold text-gray-900">E-Inventory</h1>
          <p className="text-gray-600 -mt-2 mb-10">Online inventory management system</p>

          <h2 className="text-2xl font-semibold mb-6">Login</h2>

          <form onSubmit={onSubmit} className="space-y-5">

            <input
              type="email"
              placeholder="Email Address"
              name="email"
              required
              value={email}
              onChange={onChange}
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              value={password}
              onChange={onChange}
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {/* Keep me logged in */}
            <label className="flex items-center gap-2 text-gray-700 text-sm cursor-pointer">
              <input
                type="checkbox"
                name="remember"
                checked={remember}
                onChange={onChange}
                className="h-4 w-4 text-blue-600"
              />
              Keep me logged in
            </label>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg font-semibold shadow hover:opacity-90 transition"
            >
              Log in
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 underline font-medium">
              Register
            </Link>
          </p>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="w-1/2 bg-blue-100 flex justify-center items-center p-6">
          <img 
            src="/inventory-illustration.png" 
            alt="Illustration"
            className="w-[80%] object-contain"
          />
        </div>

      </div>
    </div>
  );
}

export default Login;
