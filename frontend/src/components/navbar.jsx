import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FaRegUserCircle } from "react-icons/fa";
import { CiStopwatch } from "react-icons/ci";

export default function Nav() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	// Check if the user is logged in
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setIsLoggedIn(true); // User is logged in if a token exists
		}
	}, []);

	// Logout functionality
	const handleLogout = () => {
		localStorage.removeItem("token"); // Remove token
		setIsLoggedIn(false); // Update login state
	};

	return (
		<div>
			<nav className="text-white flex border-b-[0.1px] justify-between px-10 pt-2 fixed w-screen backdrop-blur-xl">
				<div>
					<CiStopwatch size={40} />
				</div>
				<div>
					{/* Conditionally render based on login state */}
					{isLoggedIn ? (
						<div className="flex items-center">
							<Button className="ml-4" onClick={handleLogout}>
								Logout
							</Button>
						</div>
					) : (
						<div>
							<Button className="">
								<Link to="/signup" className="text-black">
									SignUp
								</Link>
							</Button>
						</div>
					)}
				</div>
			</nav>
		</div>
	);
}
