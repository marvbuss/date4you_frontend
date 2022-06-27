import React from "react";
import { Link } from "react-router-dom";
import { useLocalState } from "../../utils/useLocalStorage";

const LoginForm = () => {
	const [state, setState] = React.useState({
		username: "",
		password: "",
		error: "",
	});

	const [jwtToken, setJwtToken] = useLocalState("", "jwt");

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

		fetch("/api/v1/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(state),
		})
			.then((response) =>
				Promise.all([response.json(), response.headers])
			)
			.then(([body, headers]) => {
				console.log("response data from /api/v1/auth/login:", body);
				const value = headers.get("authorization");
				setJwtToken(value);
				// eslint-disable-next-line no-restricted-globals
				location.reload();
			})
			.catch((err) => {
				console.log("err in fetch /api/login", err);
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
								Username
							</label>
							<input
								type="text"
								name="username"
								id="username"
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
						<div className="flex flex-col items-center justify-center w-full my-4 pt-4">
							<span
								onClick={handleSubmit}
								className="text-center ease inline-block transform cursor-pointer rounded-full bg-pink-600 px-8 py-3 text-lg font-medium text-white transition duration-500 hover:-translate-y-1"
							>
								Login
							</span>

							<Link to="/reset/password">
								<p className="text-sm">Forgot password?</p>
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className="flex justify-center w-full my-4 pt-4">
				<Link to="/registration">
					<span className="ease inline-block transform cursor-pointer rounded-full bg-pink-600 px-8 py-3 text-lg font-medium text-white transition duration-500 hover:-translate-y-1">
						Click here to Register!
					</span>
				</Link>
			</div>
		</>
	);
};

export default LoginForm;
