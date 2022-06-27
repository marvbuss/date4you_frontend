import React from "react";
import { Link, useNavigate } from "react-router-dom";

const RegistrationForm = () => {
	const [state, setState] = React.useState({
		email: "",
		password: "",
		birthdate: "",
		nickname: "",
		hornlength: 0,
		gender: 0,
		attractedToGender: 0,
		description: "",
		error: "",
	});

	const navigate = useNavigate();

	function handleChange(evt: { target: { value: any; name: any } }) {
		const value = evt.target.value;
		setState({
			...state,
			[evt.target.name]: value,
		});
		console.log(state);
	}

	function handleSubmit(e: { preventDefault: () => void }) {
		e.preventDefault();
		console.log("user wants to submit their details", state);

		fetch("/api/v1/auth/registration", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(state),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(
					"response data from /api/v1/auth/registration:",
					data
				);

				navigate("/login");
			})
			.catch((err) => {
				console.log("err in fetch /api/v1/auth/registration", err);
				setState({
					...state,
					error: "Something went wrong. Please try again!",
				});
			});
	}

	return (
		<>
			<div className="flex max-w-2xl shadow border-b mx-auto">
				<div className="px-8 py-8">
					<div className="font-thin text-2xl tracking-wider">
						<div className="items-center justify-center h-14 w-full my-4">
							<label className="block text-gray-600 text-sm font-normal">
								Email
							</label>
							<input
								type="text"
								name="email"
								id="email"
								className="h-10 w-96 border mt-2 px-2 py-2"
								onChange={handleChange}
							/>
						</div>
						<div className="items-center justify-center h-14 w-full my-4">
							<label className="block text-gray-600 text-sm font-normal">
								Password
							</label>
							<input
								type="password"
								name="password"
								id="password"
								className="h-10 w-96 border mt-2 px-2 py-2"
								onChange={handleChange}
							/>
						</div>
						<div className="items-center justify-center h-14 w-full my-4">
							<label className="block text-gray-600 text-sm font-normal">
								Birthdate
							</label>
							<input
								type="date"
								name="birthdate"
								id="birthdate"
								className="h-10 w-96 border mt-2 px-2 py-2"
								onChange={handleChange}
							/>
						</div>
						<div className="items-center justify-center h-14 w-full my-4">
							<label className="block text-gray-600 text-sm font-normal">
								Nickname
							</label>
							<input
								type="text"
								name="nickname"
								id="nickname"
								className="h-10 w-96 border mt-2 px-2 py-2"
								onChange={handleChange}
							/>
						</div>
						<div className="items-center justify-center h-14 w-full my-4">
							<label className="block text-gray-600 text-sm font-normal">
								Hornlength (cm)
							</label>
							<input
								type="number"
								name="hornlength"
								id="hornlength"
								className="h-10 w-96 border mt-2 px-2 py-2"
								onChange={handleChange}
							/>
						</div>
						<div className="items-center justify-center h-14 w-full my-4">
							<label className="block text-gray-600 text-sm font-normal">
								Gender
							</label>
							<div className="flex flex-row justify-center items-center">
								<label className="text-gray-600 text-xs font-normal">
									Male
								</label>
								<input
									type="radio"
									name="gender"
									id="genderMale"
									value={0}
									className="h-10 w-48 border mt-2 px-2 py-2"
									onChange={handleChange}
								/>
								<label className="text-gray-600 text-xs font-normal">
									Female
								</label>
								<input
									type="radio"
									name="gender"
									id="genderFemale"
									value={1}
									className="h-10 w-48 border mt-2 px-2 py-2"
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className="items-center justify-center h-14 w-full my-4">
							<label className="block text-gray-600 text-sm font-normal">
								Attracted to
							</label>
							<div className="flex flex-row justify-center items-center">
								<label className="text-gray-600 text-xs font-normal">
									Male
								</label>
								<input
									type="radio"
									name="attractedToGender"
									id="attractedToMale"
									value={0}
									className="h-10 w-48 border mt-2 px-2 py-2"
									onChange={handleChange}
								/>
								<label className="text-gray-600 text-xs font-normal">
									Female
								</label>
								<input
									type="radio"
									name="attractedToGender"
									id="attractedToFemale"
									value={1}
									className="h-10 w-48 border mt-2 px-2 py-2"
									onChange={handleChange}
								/>
							</div>
						</div>
						<div className="items-center justify-center h-14 w-full my-4">
							<label className="block text-gray-600 text-sm font-normal">
								Description
							</label>
							<input
								type="text"
								name="description"
								id="description"
								className="h-10 w-96 border mt-2 px-2 py-2"
								onChange={handleChange}
							/>
						</div>
						<div className="flex items-center justify-center w-full my-4 pt-4">
							<span
								onClick={handleSubmit}
								className="text-center ease inline-block transform cursor-pointer rounded-full bg-pink-600 px-8 py-3 text-lg font-medium text-white transition duration-500 hover:-translate-y-1"
							>
								Register
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className="flex justify-center w-full my-4 pt-4">
				<Link to="/login">
					<span className="ease inline-block transform cursor-pointer rounded-full bg-pink-600 px-8 py-3 text-lg font-medium text-white transition duration-500 hover:-translate-y-1">
						Click here to Login!
					</span>
				</Link>
			</div>
		</>
	);
};

export default RegistrationForm;
