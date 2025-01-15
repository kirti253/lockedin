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

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/user/signup", {
        username,
        email,
        password: password,
      })
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="">
      <div className="flex  justify-center  border-[1px] w-fit rounded-md h-96 mx-auto mt-40 py-5">
        <img className=" rounded-md ml-5" src="/src/assets/signup.svg" />
        <form action="" className="mx-10 flex flex-col" onSubmit={handleSubmit}>
          <div className="mx-10  flex  flex-col ">
            <p className="text-white text-center mt-5">Sign Up</p>
            <div>
              <p className="block text-sm font-medium mb-1">Username</p>
              <Input
                type="text"
                placeholder="Username"
                className="w-64"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <p className="block text-sm font-medium mb-1">Email</p>
              <Input
                type="email"
                placeholder="gmail"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <Input
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="mt-10">
              Submit
            </Button>
          </div>
        </form>
      </div>
      <p>
        <Link to="/" className="text-white text-center">
          Continue to the home page
        </Link>
      </p>
    </div>
  );
}
