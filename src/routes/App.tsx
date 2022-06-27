import React from "react";
import Dashboard from "./Dashboard";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import Welcome from "./Welcome";
import { useLocalState } from "../utils/useLocalStorage";

function App() {
	const [jwtToken, setJwtToken] = useLocalState("", "jwt");

	return (
		<>
			<div className="container mx-auto">
				<Navbar />
				<div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
					{jwtToken ? <Dashboard /> : <Welcome />}
				</div>
				<Footer />
			</div>
		</>
	);
}

export default App;
