import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationForm from "../components/registration/RegistrationForm";
import LoginForm from "../components/login/LoginForm";

const Welcome = () => {
	return (
		<div className="flex flex-col items-center justify-between lg:col-start-4 lg:col-end-10">
			<h1 className="text-8xl">Date4you</h1>
			<Router>
				<Routes>
					<Route path="*" element={<RegistrationForm />} />
					<Route path="/login" element={<LoginForm />} />
				</Routes>
			</Router>
		</div>
	);
};

export default Welcome;
