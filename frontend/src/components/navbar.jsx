import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { Button } from "@/components/ui/button";
import SignUp from "./signup";

export default function Navbar() {
  return (
    <div className="flex justify-center mt-5 border-b pb-2">
      <nav className="text-white flex justify-between w-11/12 ">
        <div>LockedIn</div>
        <div>
          <Button>
            <Link to="/signin" className="text-black">
              login
            </Link>
          </Button>
        </div>
      </nav>
      ;
    </div>
  );
}
