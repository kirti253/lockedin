import React, { useState, useEffect, useRef } from "react";

export function StopWatch() {
	const [isRunning, setIsRunning] = useState(false);
	const [elapsedTime, setElapsedTime] = useState(0);
	const intervalIdRef = useRef(null);
	const startTimeRef = useRef(0);

	useEffect(() => {
		if (isRunning) {
			intervalIdRef.current = setInterval(() => {
				setElapsedTime(Date.now() - startTimeRef.current);
			}, 10);
		}
		return () => {
			clearInterval(intervalIdRef.current);
		};
	}, [isRunning]);
	function start() {
		setIsRunning(true);
		startTimeRef.current = Date.now() - elapsedTime;
	}
	function stop() {
		setIsRunning(false);
	}

	function reset() {
		setElapsedTime(0);
		setIsRunning(false);
	}
	function formatTime() {
		let hours = Math.floor(elapsedTime / 360000);
		let minutes = Math.floor((elapsedTime % 360000) / 60000);
		let seconds = Math.floor((elapsedTime % 60000) / 1000);

		hours = String(hours).padStart(2, "0");
		minutes = String(minutes).padStart(2, "0");
		seconds = String(seconds).padStart(2, "0");

		return `${hours}:${minutes}:${seconds}`;
	}
	return (
		<div className="flex flex-col items-center bg-[hsl(0,0%,95%)]">
			<div className="flex flex-col items-center border-4 border-solid bg-white p-[30px]">
				<div className="text-8xl font-mono font-bold text-gray-800 [text-shadow:_2px_2px_2px_rgb(0_0_0_/_0.75)] mb-8  ">
					{formatTime()}
				</div>
				<div className="controlButton">
					<button onClick={start} className="hover:bg-sky-700 bg-zinc-800">
						Start
					</button>
					<button onClick={stop} className="hover:bg-sky-700 bg-zinc-800">
						Stop
					</button>
					<button onClick={reset} className="hover:bg-sky-700 bg-zinc-800">
						Reset
					</button>
				</div>
			</div>
		</div>
	);
}
