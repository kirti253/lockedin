import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import validator from "validator";

export default function SignIn() {
  const [username, setUsername] = useState("");
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
      .post("http://localhost:3000/user/signin", {
        email,
        password,
      })
      .then((result) => {
        console.log(result);
        const token = result.data.token;
        if (token) {
          localStorage.setItem("token", token);
          console.log(token);
          navigate("/");
        } else {
          console.error("No token received from the server.");
        }
      })
      .catch((err) => {
        console.error("Error response:", err.response);

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
    <div className="">
      <div className="flex  justify-center  border-[1px] w-fit rounded-md h-96 mx-auto mt-40 py-5">
        <div className="flex flex-col text-white justify-center ml-5 ">
          <img
            className=" rounded-md ml-5 w-[500px] mb-2"
            src="/src/assets/signup.svg"
          />
          <p className="text-white text-center">
            <Link to="/signup">New user? SignUp</Link>
          </p>
        </div>
        <form
          action=""
          className="mx-10 flex flex-col my-10"
          onSubmit={handleSubmit}
        >
          <div className="mx-10  flex  flex-col space-y-8 ">
            <p className="text-white text-center ">Sign in</p>
            <div>
              <Input
                type="email"
                placeholder="gmail"
                onChange={handleEmailChange}
              />
              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}
            </div>
            <div>
              <Input
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="text-red-500 text-sm ">{error}</p>}
            </div>
            <Button type="submit" className="">
              Submit
            </Button>
          </div>
        </form>
      </div>
      <p className="text-white text-center">
        <Link to="/">Continue to the home page</Link>
      </p>
    </div>
  );
}
