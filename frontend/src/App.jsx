import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";

import StopWatch from "./components/timer";
import Card from "./components/storage";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

import axios from "axios";
import { Home } from "lucide-react";
import SignUp from "./components/signup";

function AllComponents() {
  return (
    <div>
      <Navbar />

      <StopWatch />
      <Card />
      <Footer />
    </div>
  );
}

function App() {
  return (
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
  );
}
export default App;
