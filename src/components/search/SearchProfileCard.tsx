import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocalState } from "../../utils/useLocalStorage";

const ProfileCard = (props: { profile: any }) => {
	const [jwtToken, setJwtToken] = useLocalState("", "jwt");
	const [src, setSrc] = useState("");

	useEffect(() => {
		let profilePhoto = props.profile.photos.filter(
			(photo: { profilePhoto: boolean }) => photo.profilePhoto === true
		);

		profilePhoto.length
			? fetch(`/api/v1/photos/photo?name=${profilePhoto[0].name}`, {
					headers: {
						Authorization: `Bearer ${jwtToken}`,
					},
			  })
					.then((response) => response.blob())
					.then((data) => {
						const objectUrl = URL.createObjectURL(data);
						setSrc(objectUrl);
					})
					.catch((err) => {
						console.log(
							"err in fetch /api/v1/photos/photo?name",
							err
						);
					})
			: setSrc("default2.jpg");
	}, [jwtToken, props.profile.photos]);

	return (
		<>
			<Link to={`profile/${props.profile.id}`}>
				<div className="text-center" key={props.profile.nickname}>
					<img className="" src={src} alt={src} />
					<h1>Name: {props.profile.nickname}</h1>
					<h3>Age: {props.profile.birthdate}</h3>
					<h3>Hornlength: {props.profile.hornlength}</h3>
				</div>
			</Link>
		</>
	);
};

export default ProfileCard;
