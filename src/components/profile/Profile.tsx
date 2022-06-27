import React, { useEffect } from "react";
import { useLocalState } from "../../utils/useLocalStorage";
import ProfileForm from "./ProfileForm";
import ProfilePhotos from "./ProfilePhotos";

const Profile = () => {
	const [jwtToken, setJwtToken] = useLocalState("", "jwt");
	const [state, setState] = React.useState({
		birthdate: "",
		nickname: "",
		hornlength: 0,
		gender: 0,
		attractedToGender: 0,
		description: "",
		error: "",
	});
	const [profilePhotos, setProfilePhotos] = React.useState([]);

	useEffect(() => {
		fetch("/api/v1/profiles/profile", {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${jwtToken}`,
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				const {
					birthdate,
					nickname,
					hornlength,
					gender,
					attractedToGender,
					description,
					photos,
				} = data;

				setState({
					...state,
					birthdate,
					nickname,
					hornlength,
					gender,
					attractedToGender,
					description,
				});

				setProfilePhotos(photos);
			})
			.catch((err) => {
				console.log("err in fetch /api/v1/profiles/profile", err);
				setState({
					...state,
					error: "Something went wrong. Please try again!",
				});
			});
	}, []);

	return (
		<>
			<div className="flex flex-col items-center justify-between col-span-1 lg:col-span-5">
				<ProfilePhotos photos={profilePhotos} />
			</div>
			<div className="flex flex-col items-center justify-between col-span-1 lg:col-span-7">
				<ProfileForm isOtherProfile={false} profile={state} />
			</div>
		</>
	);
};

export default Profile;
