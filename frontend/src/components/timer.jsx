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
		return () => {};
	}, [isRunning]);
	function start() {
		setIsRunning(false);
	}
	function stop() {
		setIsRunning(false);
	}
	function reset() {
		setElapsedTime(0);
		setIsRunning(false);
	}
	function formatTime() {
		let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
		let minutes = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);
		let seconds = Math.floor(elapsedTime / (1000 % 60));
		let milliseconds = Math.floor((elapsedTime % 1000) / 10);

		hours = String(hours).padStart(2, "0");
		minutes = String(minutes).padStart(2, "0");
		seconds = String(seconds).padStart(2, "0");
		milliseconds = String(milliseconds).padStart(2, "0");
		return `${minutes}:${seconds}:${milliseconds}`;
	}
	return (
		<div className="flex flex-col items-center bg-[hsl(0,0%,95%)]">
			<div className="flex flex-col items-center border-4 border-solid bg-white p-[30px]">
				<div className="text-8xl font-mono font-bold text-gray-800 [text-shadow:_2px_2px_2px_rgb(0_0_0_/_0.75)] mb-8  ">
					{formatTime()}
				</div>
				<div className="controlButton">
					<button onClick={start} className="start-button">
						Start
					</button>
					<button onClick={stop} className="stop-button">
						Stop
					</button>
					<button onClick={reset} className="reset-button">
						Reset
					</button>
				</div>
			</div>
		</div>
	);
}
