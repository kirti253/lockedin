import { SignUp } from "./components/signup";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

import { StopWatch } from "./components/timer";
import { Card } from "./components/storage";
import Footer from "./components/footer";
import { Navbar } from "./components/navbar";
import axios from "axios";

function App() {
	return (
		<div>
			<Router>
				<Routes>
					<Route exact path="/" element={<StopWatch />} />

					<Route path="/footer" element={<Footer />} />

					<Route path="/contactus" element={<Card />} />

					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</Router>
			{/* <SignUp />
			// <Navbar />
			[]
			<StopWatch />
			<Card />
			<Footer /> */}
		</div>
	);
}
export default App;
