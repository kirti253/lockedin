import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import validator from "validator";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const emailInput = e.target.value;
    setEmail(emailInput);

    if (!validator.isEmail(emailInput)) {
      setEmailError("Please enter a valid email address!");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validator.isEmail(email)) {
      setEmailError("Please enter a valid email address!");
      return;
    }

    axios
      .post(
        "https://time-back.vercel.app/user/signin",
        { email, password },
        { withCredentials: true } // If your backend uses cookies for authentication
      )

      .then((result) => {
        const token = result.data.token;
        if (token) {
          localStorage.setItem("token", token);
          navigate("/");
        } else {
          console.error("No token received from the server.");
        }
      })
      .catch((err) => {
        if (err.response) {
          const serverMessage = err.response.data?.message;

          if (serverMessage === "Email not exists") {
            setEmailError("This email is not registered. Please sign up.");
          } else if (serverMessage === "Invalid password") {
            setError("Invalid password. Please try again.");
          } else {
            setError(serverMessage || "An unexpected error occurred.");
          }
        } else {
          setError("Unable to connect to the server. Please try again later.");
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-center justify-center border  rounded-md w-full max-w-4xl mx-4 p-5 md:p-10 space-y-6 md:space-y-0 md:space-x-8">
        {/* Left Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-10">
          <img
            className="rounded-md w-64 md:w-80"
            src="/src/assets/signup.svg"
            alt="Sign In"
          />
          <p className="text-gray-300">
            <Link to="/signup" className="underline">
              New user? Sign Up
            </Link>
          </p>
        </div>

        {/* Right Section */}
        <form
          className="flex flex-col w-full max-w-sm space-y-6"
          onSubmit={handleSubmit}
        >
          <h2 className="text-white text-center text-xl font-semibold">
            Sign In
          </h2>
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              className="w-full"
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <Button type="submit">Submit</Button>
          <p className="text-center text-gray-300">
            <Link to="/" className="underline">
              Continue to the home page
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
