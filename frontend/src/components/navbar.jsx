import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FaRegUserCircle } from "react-icons/fa";

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
    <div className="flex justify-center border-b p-2">
      <nav className="text-white flex justify-between w-11/12">
        <div>LockedIn</div>
        <div>
          {/* Conditionally render based on login state */}
          {isLoggedIn ? (
            <div className="flex items-center">
              {/* Avatar Icon */}
              <FaRegUserCircle size={30} />
              {/* Dropdown or Logout Button */}
              <Button className="ml-4" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <div>
              <Button className="mr-10">
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
