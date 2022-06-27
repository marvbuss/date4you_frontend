import React from "react";

const Navbar = () => {
	return (
		<div className="h-18 px-7 max-w-full top-0  py-7 mb-8 border-pink-600 border-b bg-black">
			<nav className="flex items-center justify-between">
				<a href="/">
					<div className="cursor-pointer text-2xl text-white">
						Date4you
					</div>
				</a>
			</nav>
		</div>
	);
};

export default Navbar;
