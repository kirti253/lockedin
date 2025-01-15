import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Nav() {
  return (
    <div className="flex justify-center  border-b p-2">
      <nav className="text-white flex justify-between w-11/12 ">
        <div>LockedIn</div>
        <div>
          <Button>
            <Link to="/signin" className="text-black">
              Login
            </Link>
          </Button>
        </div>
      </nav>
    </div>
  );
}
