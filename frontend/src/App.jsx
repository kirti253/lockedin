import { SignUp } from "./components/signup/signup";
import { StopWatch } from "./components/timer";
import { Card } from "./components/card";
import { Footer } from "./components/footer";
import { Navbar } from "./components/navbar";

function App() {
	return (
		<div>
			<StopWatch />
			<Card />
			{/* <Navbar /> */}
			<Footer />
		</div>
	);
}
export default App;
