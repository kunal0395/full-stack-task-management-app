import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { SignJWT } from "jose";

async function signToken(payload, secretKey) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(new TextEncoder().encode(secretKey));
  return token;
}

const Login = ({ isOpen, onClose, onLoginSuccess }) => {
  const [swipe, changeSwipe] = useState(false);
  const [eyeState, setEyeState] = useState({
    eye1: false,
    eye2: false,
    eye3: false,
  });
  const [loginError, setLoginError] = useState("");

  const toggleForm = (formType) => {
    changeSwipe(formType === "register");
  };

  const togglePassword = (key) => {
    setEyeState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    reset,
  } = useForm();

  const handleLogin = async (data) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) =>
        user.username === data.username && user.password === data.password
    );

    if (user) {
      try {
        const token = await signToken(
          { username: user.username },
          "mysupersecretkey1234566"
        );
        localStorage.setItem("jwtToken", token);
        onLoginSuccess(); // Notify parent
        reset();
        onClose(); // Close modal
      } catch (error) {
        setLoginError("An error occurred while processing your login.");
      }
    } else {
      setLoginError("Invalid username or password.");
    }
  };

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    reset: resetRegister,
  } = useForm();

  const handleRegister = (data) => {
    if (data.password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }
    if (data.username.length < 8) {
      alert("Username must be more than 8 characters long.");
      return;
    }
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((user) => user.username === data.username);

    if (userExists) {
      alert("User already exists. Please log in.");
    } else {
      users.push({
        username: data.username,
        password: data.password,
      });
      localStorage.setItem("users", JSON.stringify(users));
      console.log("User registered successfully!");
      resetRegister();
      toggleForm("login"); // Switch to login form
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-md">
        <div className="p-6">
          {/* Toggle Buttons */}
          <div className="flex justify-center mb-4">
            <div className="flex items-center bg-gray-200 p-1 rounded-full">
              <button
                className={`w-28 py-2 font-semibold rounded-full transition-all ${
                  !swipe ? "bg-orange-500 text-white" : "text-gray-800"
                }`}
                onClick={() => toggleForm("login")}
              >
                Login
              </button>
              <button
                className={`w-28 py-2 font-semibold rounded-full transition-all ${
                  swipe ? "bg-orange-500 text-white" : "text-gray-800"
                }`}
                onClick={() => toggleForm("register")}
              >
                Signup
              </button>
            </div>
          </div>

          {/* Forms Section */}
          <div className="relative">
            {/* Login Form */}
            <form
              className={`${
                !swipe ? "block" : "hidden"
              } space-y-4 transition-opacity duration-500`}
              onSubmit={handleLoginSubmit(handleLogin)}
            >
              <input
                type="text"
                placeholder="Username"
                className="w-full border rounded-lg p-2"
                {...loginRegister("username", {
                  required: "Username is required",
                })}
              />
              <div className="relative">
                <input
                  type={eyeState.eye1 ? "text" : "password"}
                  placeholder="Password"
                  className="w-full border rounded-lg p-2"
                  {...loginRegister("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={() => togglePassword("eye1")}
                >
                  {eyeState.eye1 ? <FiEye /> : <FiEyeOff />}
                </span>
              </div>
              {loginError && <p className="text-red-500">{loginError}</p>}
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 rounded-lg"
              >
                Login
              </button>
            </form>

            {/* Signup Form */}
            <form
              className={`${
                swipe ? "block" : "hidden"
              } space-y-4 transition-opacity duration-500`}
              onSubmit={handleRegisterSubmit(handleRegister)}
            >
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-700 text-center mb-4">
                  Username and Password should be more than 8 characters
                </h2>

                <input
                  type="text"
                  placeholder="Username"
                  className="w-full border rounded-lg p-2"
                  {...registerRegister("username", {
                    required: "Username is required",
                    minLength: {
                      value: 8,
                      message: "Username must be more than 8 characters",
                    },
                  })}
                />
                <div className="relative">
                  <input
                    type={eyeState.eye2 ? "text" : "password"}
                    placeholder="Password"
                    className="w-full border rounded-lg p-2"
                    {...registerRegister("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                  />
                  <span
                    className="absolute right-3 top-3 cursor-pointer"
                    onClick={() => togglePassword("eye2")}
                  >
                    {eyeState.eye2 ? <FiEye /> : <FiEyeOff />}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type={eyeState.eye3 ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="w-full border rounded-lg p-2"
                    {...registerRegister("confirmPassword", {
                      required: "Please confirm your password",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                  />
                  <span
                    className="absolute right-3 top-3 cursor-pointer"
                    onClick={() => togglePassword("eye3")}
                  >
                    {eyeState.eye3 ? <FiEye /> : <FiEyeOff />}
                  </span>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 rounded-lg"
              >
                Signup
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
