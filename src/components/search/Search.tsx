import React, { useState } from "react";
import { useLocalState } from "../../utils/useLocalStorage";
import ProfileCard from "./SearchProfileCard";

const Search = () => {
	const [jwtToken, setJwtToken] = useLocalState("", "jwt");
	const [profiles, setProfiles] = useState([]);
	const [state, setState] = React.useState({
		minAge: 0,
		maxAge: 0,
		minHornlength: 0,
		maxHornlength: 0,
		gender: 0,
		error: "",
	});

	function handleChange(evt: { target: { value: any; name: any } }) {
		const value = evt.target.value;
		setState({
			...state,
			[evt.target.name]: Number(value),
		});
		console.log(state);
	}

	function handleSubmit(e: { preventDefault: () => void }) {
		e.preventDefault();
		console.log("user wants to start a matches search", state);

		fetch(
			`/api/v1/profiles/matches?minAge=${state.minAge}&maxAge=${state.maxAge}&minHornlength=${state.minHornlength}&maxHornlength=${state.maxHornlength}&gender=${state.gender}`,
			{
				headers: {
					Authorization: `Bearer ${jwtToken}`,
				},
			}
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(
					"response data from /api/v1/profiles/matches:",
					data
				);
				setProfiles(data);
			})
			.catch((err) => {
				console.log("err in fetch /api/v1/profiles/matches", err);
				setState({
					...state,
					error: "Something went wrong. Please try again!",
				});
			});
	}

	return (
		<>
			<div className="col-span-1 lg:col-span-12 m-20">
				<h1 className="text-center text-2xl">Ich suche Einhörner</h1>
				<div className="flex flex-row mb-2 justify-center">
					<div>
						<label className="text-m">Im Alter von:</label>
						<select
							name="minAge"
							id="minAge"
							onChange={handleChange}
						>
							<option value={0}>
								--Please choose an option--
							</option>
							<option value={18}>18 Jahren</option>
							<option value={20}>20 Jahren</option>
							<option value={30}>30 Jahren</option>
							<option value={40}>40 Jahren</option>
							<option value={50}>50 Jahren</option>
							<option value={60}>60 Jahren</option>
							<option value={99}>99 Jahren</option>
						</select>
					</div>
					<div>
						<label className="text-m">bis:</label>
						<select
							name="maxAge"
							id="maxAge"
							onChange={handleChange}
						>
							<option value={0}>
								--Please choose an option--
							</option>
							<option value={18}>18 Jahren</option>
							<option value={20}>20 Jahren</option>
							<option value={30}>30 Jahren</option>
							<option value={40}>40 Jahren</option>
							<option value={50}>50 Jahren</option>
							<option value={60}>60 Jahren</option>
							<option value={99}>99 Jahren</option>
						</select>
					</div>
				</div>
				<div className="flex flex-row mb-2 justify-center">
					<div>
						<label className="text-m">
							Mit einer Hornlänge von:
						</label>
						<select
							name="minHornlength"
							id="mixHornlength"
							onChange={handleChange}
						>
							<option value={0}>
								--Please choose an option--
							</option>
							<option value={0}>0 CM</option>
							<option value={10}>10 CM</option>
							<option value={20}>20 CM</option>
							<option value={30}>30 CM</option>
							<option value={40}>40 CM</option>
							<option value={50}>50 CM</option>
							<option value={60}>60 CM</option>
						</select>
					</div>
					<div>
						<label className="text-m">bis:</label>
						<select
							name="maxHornlength"
							id="maxHornlength"
							onChange={handleChange}
						>
							<option value={0}>
								--Please choose an option--
							</option>
							<option value={0}>0 CM</option>
							<option value={10}>10 CM</option>
							<option value={20}>20 CM</option>
							<option value={30}>30 CM</option>
							<option value={40}>40 CM</option>
							<option value={50}>50 CM</option>
							<option value={60}>60 CM</option>
						</select>
					</div>
				</div>
				<div className="flex flex-row mb-2 justify-center">
					<div>
						<label className="text-m">Geschlecht:</label>
						<select
							name="gender"
							id="gender"
							onChange={handleChange}
						>
							<option value={0}>
								--Please choose an option--
							</option>
							<option value={0}>Männer</option>
							<option value={1}>Frauen</option>
						</select>
					</div>
				</div>
				<div className="flex items-center justify-center w-full my-4 pt-4">
					<span
						onClick={handleSubmit}
						className="text-center ease inline-block transform cursor-pointer rounded-full bg-pink-600 px-8 py-3 text-lg font-medium text-white transition duration-500 hover:-translate-y-1"
					>
						Looking for matches
					</span>
				</div>
			</div>
			<div className="flex flex-col items-center justify-center col-span-1 lg:col-span-12">
				<div className="grid gap-8 grid-cols-1 lg:grid-cols-4 place-items-center ">
					{profiles.map((profile, i) => (
						<ProfileCard key={i} profile={profile} />
					))}
				</div>
			</div>
		</>
	);
};

export default Search;
