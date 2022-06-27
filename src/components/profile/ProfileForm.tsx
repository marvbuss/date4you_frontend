import React, { useEffect } from "react";

const ProfileForm = (props: { profile: any; isOtherProfile: boolean }) => {
	const [state, setState] = React.useState({
		birthdate: "",
		nickname: "",
		hornlength: 0,
		gender: 0,
		attractedToGender: 0,
		description: "",
		error: "",
	});

	useEffect(() => {
		const {
			birthdate,
			nickname,
			hornlength,
			gender,
			attractedToGender,
			description,
		} = props.profile;

		setState({
			birthdate: birthdate,
			nickname: nickname,
			hornlength: hornlength,
			gender: gender,
			attractedToGender: attractedToGender,
			description: description,
			error: "",
		});
	}, [props.profile]);

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

		fetch("/api/v1/profiles/profile/update", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(state),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(
					"response data from /api/v1/profiles/profile/update:",
					data
				);

				// eslint-disable-next-line no-restricted-globals
				location.reload();
			})
			.catch((err) => {
				console.log(
					"err in fetch /api/v1/profiles/profile/update",
					err
				);
				setState({
					...state,
					error: "Something went wrong. Please try again!",
				});
			});
	}

	// TODO: refactor handleSubmit for updadating profile
	// TODO: refactor description to textarea

	return (
		<>
			<div className="font-thin text-2xl tracking-wider">
				<div className="items-center justify-center w-full my-4">
					<label className="block text-gray-600 text-m font-normal">
						Birthdate
					</label>
					<input
						type="date"
						name="birthdate"
						id="birthdate"
						className="w-full border mt-2 px-2 py-2"
						onChange={handleChange}
						value={state.birthdate}
					/>
				</div>
				<div className="items-center justify-center w-full my-4">
					<label className="block text-gray-600 text-m font-normal">
						Nickname
					</label>
					<input
						type="text"
						name="nickname"
						id="nickname"
						className="w-full border mt-2 px-2 py-2"
						onChange={handleChange}
						value={state.nickname}
					/>
				</div>
				<div className="items-center justify-center w-full my-4">
					<label className="block text-gray-600 text-m font-normal">
						Hornlength (cm)
					</label>
					<input
						type="number"
						name="hornlength"
						id="hornlength"
						className="w-full border mt-2 px-2 py-2"
						onChange={handleChange}
						value={state.hornlength}
					/>
				</div>
				<div className="items-center justify-center w-full my-4">
					<label className="block text-gray-600 text-m font-normal">
						Gender
					</label>
					<div className="flex flex-row justify-center items-center">
						<label className="text-gray-600 text-sm font-normal">
							Male
						</label>
						<input
							type="radio"
							name="gender"
							id="genderMale"
							value={0}
							className="w-full border mt-2 px-2 py-2"
							onChange={handleChange}
							checked={state.gender === 0 || "0" ? true : false}
						/>
						<label className="text-gray-600 text-sm font-normal">
							Female
						</label>
						<input
							type="radio"
							name="gender"
							id="genderFemale"
							value={1}
							className="w-full border mt-2 px-2 py-2"
							onChange={handleChange}
							checked={state.gender === 1 || "1" ? true : false}
						/>
					</div>
				</div>
				<div className="items-center justify-center w-full my-4">
					<label className="block text-gray-600 text-m font-normal">
						Attracted to
					</label>
					<div className="flex flex-row justify-center items-center">
						<label className="text-gray-600 text-sm font-normal">
							Male
						</label>
						<input
							type="radio"
							name="attractedToGender"
							id="attractedToMale"
							value={0}
							className="w-full border mt-2 px-2 py-2"
							onChange={handleChange}
							checked={
								state.attractedToGender === 0 || "0"
									? true
									: false
							}
						/>
						<label className="text-gray-600 text-sm font-normal">
							Female
						</label>
						<input
							type="radio"
							name="attractedToGender"
							id="attractedToFemale"
							value={1}
							className="w-full border mt-2 px-2 py-2"
							onChange={handleChange}
							checked={
								state.attractedToGender === 1 || "1"
									? true
									: false
							}
						/>
					</div>
				</div>
				<div className="items-center justify-center w-full my-4">
					<label className="block text-gray-600 text-m font-normal">
						Description
					</label>
					<input
						type="text"
						name="description"
						id="description"
						className="w-full border mt-2 px-2 py-2"
						onChange={handleChange}
						value={state.description}
					/>
				</div>
				<div className="flex items-center justify-center w-full my-4 pt-4">
					<span
						onClick={handleSubmit}
						className="text-center ease inline-block transform cursor-pointer rounded-full bg-pink-600 px-8 py-3 text-lg font-medium text-white transition duration-500 hover:-translate-y-1"
					>
						Update Profile
					</span>
				</div>
			</div>
		</>
	);
};

export default ProfileForm;
