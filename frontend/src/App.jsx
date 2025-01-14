import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

import StopWatch from "./components/timer";
import Card from "./components/storage";
import Footer from "./components/footer";

import axios from "axios";
import { Home } from "lucide-react";
import SignUp from "./components/signup";

function AllComponents() {
	return (
		<div>
			{/* <StopWatch />
      <Card />
      <Footer /> */}
			<SignUp />
		</div>
	);
}
function App() {
	return (
		<div>
			<Router>
				<Routes>
					<Route exact path="/" element={<AllComponents />} />
					<Route exact path="/stopwatch" element={<StopWatch />} />

					<Route path="/card" element={<Card />} />

					<Route path="/footer" element={<Footer />} />

					<Route path="*" element={<AllComponents />} />
				</Routes>
			</Router>
		</div>
	);
}
export default App;
