// import { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate, Link } from 'react-router-dom';
// import { register, reset } from '../features/auth/authSlice';

// function Register() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const { name, email, password, confirmPassword } = formData;

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { user, isLoading, isError, isSuccess, message } = useSelector(
//     (state) => state.auth
//   );

//   useEffect(() => {
//     if (isError) {
//       alert(message);
//     }

//     if (isSuccess || user) {
//       navigate('/');
//     }

//     dispatch(reset());
//   }, [user, isError, isSuccess, message, navigate, dispatch]);

//   const onChange = (e) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       alert('Passwords do not match');
//     } else {
//       const userData = {
//         name,
//         email,
//         password,
//       };
//       dispatch(register(userData));
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
//         <div className="text-xl font-semibold text-gray-700 animate-pulse">
//           Loading...
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col justify-center items-center px-4">
//       <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl w-full max-w-md border border-blue-50">
//         <h1 className="text-3xl font-extrabold text-center mb-2 text-gray-900 tracking-tight">
//           Create an account
//         </h1>
//         <p className="text-center text-gray-500 mb-8 text-sm">
//           Register to start adding and managing your products
//         </p>

//         <form onSubmit={onSubmit} className="space-y-5">
//           <div>
//             <label
//               htmlFor="name"
//               className="block mb-1 text-sm font-medium text-gray-700"
//             >
//               Name
//             </label>
//             <input
//               type="text"
//               className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm placeholder:text-gray-400"
//               id="name"
//               name="name"
//               value={name}
//               placeholder="Enter your name"
//               onChange={onChange}
//               required
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="email"
//               className="block mb-1 text-sm font-medium text-gray-700"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm placeholder:text-gray-400"
//               id="email"
//               name="email"
//               value={email}
//               placeholder="Enter your email"
//               onChange={onChange}
//               required
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="block mb-1 text-sm font-medium text-gray-700"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm placeholder:text-gray-400"
//               id="password"
//               name="password"
//               value={password}
//               placeholder="Enter password"
//               onChange={onChange}
//               required
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="confirmPassword"
//               className="block mb-1 text-sm font-medium text-gray-700"
//             >
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm placeholder:text-gray-400"
//               id="confirmPassword"
//               name="confirmPassword"
//               value={confirmPassword}
//               placeholder="Confirm password"
//               onChange={onChange}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-xl hover:bg-blue-700 active:bg-blue-800 transition duration-200 shadow-md hover:shadow-lg text-sm tracking-wide"
//           >
//             Submit
//           </button>
//         </form>

//         <div className="mt-6 text-center">
//           <p className="text-gray-600 text-sm">
//             Already have an account?{' '}
//             <Link
//               to="/login"
//               className="text-blue-600 font-medium hover:underline hover:text-blue-700"
//             >
//               Login
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register, reset } from "../features/auth/authSlice";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

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
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword)
      return alert("Passwords do not match");

    dispatch(register({ name, email, password }));
  };

  if (isLoading)
    return <div className="text-center mt-20 text-xl font-semibold">Loading...</div>;

  return (
    <div className="min-h-screen w-full bg-gray-50 flex justify-center items-center px-6">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl flex overflow-hidden">

        {/* LEFT REGISTER FORM */}
        <div className="w-1/2 p-10 flex flex-col justify-center">

          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-600 -mt-2 mb-10">
            Register to manage your inventory
          </p>

          <form onSubmit={onSubmit} className="space-y-5">

            <input
              type="text"
              placeholder="Full Name"
              name="name"
              required
              value={name}
              onChange={onChange}
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 outline-none"
            />

            <input
              type="email"
              placeholder="Email Address"
              name="email"
              required
              value={email}
              onChange={onChange}
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              value={password}
              onChange={onChange}
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 outline-none"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              required
              value={confirmPassword}
              onChange={onChange}
              className="w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 outline-none"
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg font-semibold shadow hover:opacity-90 transition"
            >
              Register
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 underline font-medium">
              Login
            </Link>
          </p>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="w-1/2 bg-blue-100 flex justify-center items-center p-6">
          <img
            src="/inventory-illustration.png"
            alt="Register Illustration"
            className="w-[80%] object-contain"
          />
        </div>

      </div>
    </div>
  );
}

export default Register;
