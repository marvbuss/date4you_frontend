import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import OtherProfile from "../components/profile/OtherProfile";
import Profile from "../components/profile/Profile";
import Search from "../components/search/Search";

const Dashboard = () => {
	return (
		<>
			<Router>
				<div className="flex items-center justify-center col-span-1 lg:col-span-12">
					<Link to="/">
						<span className="ease inline-block transform cursor-pointer rounded-full bg-pink-600 px-8 py-3 text-lg font-medium text-white transition duration-500 hover:-translate-y-1">
							Profile
						</span>
					</Link>
					<Link to="/search">
						<span className="ease inline-block transform cursor-pointer rounded-full bg-pink-600 px-8 py-3 text-lg font-medium text-white transition duration-500 hover:-translate-y-1">
							Search
						</span>
					</Link>
				</div>
				<Routes>
					<Route path="*" element={<Profile />} />
					<Route path="/search" element={<Search />} />
					<Route
						path="search/profile/:id"
						element={<OtherProfile />}
					/>
				</Routes>
			</Router>
		</>
	);
};

export default Dashboard;
