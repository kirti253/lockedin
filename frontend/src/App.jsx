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
import SignIn from "./components/signin";
import Nav from "./components/navbar";
import { RefreshProvider } from "./components/refresh";
function AllComponents() {
	return (
		<div>
			<Nav />
			<StopWatch />
			<Card />
			<Footer />
		</div>
	);
}

function App() {
	return (
		<div>
			<RefreshProvider>
				<Router>
					<div>
						<Routes>
							<Route exact path="/" element={<AllComponents />} />
							<Route exact path="/stopwatch" element={<StopWatch />} />

							<Route path="/card" element={<Card />} />

							<Route path="/footer" element={<Footer />} />
							<Route path="/signup" element={<SignUp />} />
							<Route path="/signin" element={<SignIn />} />

							<Route path="*" element={<AllComponents />} />
						</Routes>
					</div>
				</Router>
			</RefreshProvider>
		</div>
	);
}
export default App;
