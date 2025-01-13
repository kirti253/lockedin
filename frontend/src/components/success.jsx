export default function Verified() {
	const videoRef = useRef(null);

	useEffect(() => {
		// Set playback speed when the component mounts
		if (videoRef.current) {
			videoRef.current.playbackRate = 1.5; // Change to your desired speed
		}
	}, []);

	return (
		<div className="text-white">
			<div className="flex flex-col justify-center  border-[1px] w-fit rounded-md mx-auto mt-40 ">
				<video
					ref={videoRef}
					src="/src/assets/verified.mp4" // Replace with your video path
					autoPlay
					loop
					muted
					playsInline
					style={{ width: "100%", maxHeight: "400px" }}
				/>
				<p className="text-center">Continue To the home page</p>
			</div>
		</div>
	);
}
import React, { useRef, useEffect } from "react";

const SpeedControlledVideo = () => {};
