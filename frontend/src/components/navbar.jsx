import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
		<nav className="text-white flex items-center justify-between px-6 md:px-10 py-3 fixed top-0 w-full bg-black border-b border-gray-700 z-50">
			{/* Logo Section */}
			<div className="flex items-center space-x-3">
				<CiStopwatch size={32} className="text-white" />
				<span className="text-xl font-bold text-white">TimeTracker</span>
			</div>

			{/* Navigation Links */}
			<div className="flex items-center space-x-4">
				{isLoggedIn ? (
					<div className="flex items-center space-x-4">
						<FaRegUserCircle size={24} className="text-gray-400" />
						<Button
							className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
							onClick={handleLogout}
						>
							Logout
						</Button>
					</div>
				) : (
					<div className="flex items-center space-x-4">
						<Button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md">
							<Link to="/signup" className="text-white">
								SignUp
							</Link>
						</Button>
						<Button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md">
							<Link to="/signin" className="text-white">
								SignIn
							</Link>
						</Button>
					</div>
				)}
			</div>
		</nav>
	);
}
