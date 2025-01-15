import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { Button } from "@/components/ui/button";
import StopWatch from "./components/timer";
import Card from "./components/storage";

import Footer from "./components/footer";

import axios from "axios";
import { Home } from "lucide-react";
import SignUp from "./components/signup";

function AllComponents() {
  return (
    <div>
      <StopWatch />
      <Card />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <div>
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

      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<AllComponents />} />
            <Route exact path="/stopwatch" element={<StopWatch />} />

            <Route path="/card" element={<Card />} />

            <Route path="/footer" element={<Footer />} />
            <Route path="/signin" element={<SignUp />} />

            <Route path="*" element={<AllComponents />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
export default App;
