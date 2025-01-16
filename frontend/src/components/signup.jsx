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
	const handleSubmit = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setError("Passwords do not match!");
			return;
		}
		if (!validator.isEmail(email)) {
			setEmailError("Please enter a valid email address!");
			return;
		}

		axios
			.post("http://localhost:3000/user/signup", {
				username,
				email,
				password: password,
			})
			.then((result) => {
				console.log(result);
				navigate("/signin");
			})
			.catch((err) => {
				console.error("Error response:", err.response);
				if (
					err.response &&
					err.response.data &&
					err.response.data.message === "Email already exists"
				) {
					setEmailError(
						"This email is already registered. Please use another email."
					);
				} else {
					setError("email already registered");
				}
				console.error(err);
			});
	};

	return (
		<div className="">
			<div className="flex  justify-center   border-[1px] w-fit rounded-md h-96 mx-auto mt-40 py-5">
				<div className="flex flex-col text-white justify-center ml-5 ">
					<img
						className=" rounded-md ml-5 w-[500px]"
						src="/src/assets/signup.svg"
					/>
					<p className="text-white text-center">
						<Link to="/signin">Already a user? SignIn</Link>
					</p>
				</div>
				<form action="" className="mx-5 flex flex-col" onSubmit={handleSubmit}>
					<div className="  flex  flex-col ">
						<p className="text-white text-center ">Sign Up</p>
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
								placeholder="email"
								value={email}
								onChange={handleEmailChange}
							/>
							{emailError && (
								<p className="text-red-500 text-sm">{emailError}</p>
							)}
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">Password</label>
							<Input
								type="password"
								placeholder="password"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">Password</label>
							<Input
								type="password"
								placeholder="Confirm password"
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
						</div>
						{error && <p className="text-red-500 text-sm ">{error}</p>}
						<Button type="submit" className="mt-4">
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
