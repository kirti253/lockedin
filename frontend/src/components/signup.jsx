import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import validator from "validator";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (!validator.isEmail(email)) {
      setEmailError("Please enter a valid email address!");
      return;
    }

    try {
      await axios.post("https://time-back.vercel.app/user/signup", {
        username,
        email,
        password,
      });
      navigate("/signin");
    } catch (err) {
      console.error("Error response:", err.response);
      if (err.response?.data?.message === "Email already exists") {
        setEmailError(
          "This email is already registered. Please use another email."
        );
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="mx-5">
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <div className="flex flex-col md:flex-row items-center border rounded-md p-6 md:p-10  w-full max-w-5xl">
          <div className="flex flex-col items-center md:items-start md:w-1/2">
            <img
              className="rounded-md w-64 md:w-96 mb-6 md:mb-0"
              src="/assets/signup.svg"
              alt="Sign Up"
            />
            <p className="text-white text-center md:text-left mt-4">
              <Link to="/signin" className=" hover:underline">
                Already a user? Sign In
              </Link>
            </p>
          </div>
          <form
            className="flex flex-col space-y-4 w-full md:w-1/2 mt-6 md:mt-0 md:ml-8"
            onSubmit={handleSubmit}
          >
            <h2 className="text-white text-center text-xl font-semibold">
              Sign Up
            </h2>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <Button type="submit">Submit</Button>
          </form>
        </div>
        <p className="text-white text-center mt-6">
          <Link to="/" className="text-white hover:underline">
            Continue to the home page
          </Link>
        </p>
      </div>
    </div>
  );
}
