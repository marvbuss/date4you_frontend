import React, { useEffect, useState } from "react";
import { useLocalState } from "../../utils/useLocalStorage";
import { Carousel } from "react-responsive-carousel";

const ProfilePhotos = (props: { photos: any }) => {
	const [jwtToken, setJwtToken] = useLocalState("", "jwt");
	const [src, setSrc] = useState<string[]>([]);

	useEffect(() => {
		if (props.photos.length === 0) {
			setSrc(() => ["/default2.jpg"]);
		} else {
			setSrc(() => []);
			props.photos.map((photo: { name: string }) => {
				fetch(`/api/v1/photos/photo?name=${photo.name}`, {
					headers: {
						Authorization: `Bearer ${jwtToken}`,
					},
				})
					.then((response) => response.blob())
					.then((data) => {
						const objectUrl = URL.createObjectURL(data);
						setSrc((oldArray) => [...oldArray, objectUrl]);
					})
					.catch((err) => {
						console.log(
							"err in fetch /api/v1/photos/photo?name",
							err
						);
					});
			});
		}
	}, [jwtToken, props.photos]);

	// TODO: filter main profile foto

	return (
		<>
			{
				<Carousel className="carousel">
					{src.map((image, i) => {
						return (
							<div key={i}>
								<img src={image} alt={image} />
							</div>
						);
					})}
				</Carousel>
			}
		</>
	);
};

export default ProfilePhotos;
