import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

function getDate() {
	const today = new Date();
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	let monthIndex = today.getMonth();
	let monthName = monthNames[monthIndex];
	const year = today.getFullYear();
	const date = today.getDate();
	return `${date} ${monthName} ${year}`;
}

export default function StopWatch() {
	const [isRunning, setIsRunning] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const [task, setTask] = useState("");
	const [elapsedTime, setElapsedTime] = useState(0);
	const [currentDate, setCurrentDate] = useState(getDate());
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

	const start = () => {
		setIsRunning(true);
		setIsPaused(false);
		startTimeRef.current = Date.now() - elapsedTime;
	};

	const stop = () => {
		setIsRunning(false);
		setIsPaused(true);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const token = localStorage.getItem("token");
		console.log(token);
		console.log("Task (title):", task);
		console.log("Elapsed Time (duration):", elapsedTime);
		console.log("Current Date:", currentDate);
		if (!token) {
			console.error("Token is missing. Please sign in again.");
			return;
		}

		axios
			.post(
				"http://localhost:3000/tasklist/task",
				{
					title: task,
					duration: elapsedTime.toString(),
					date: currentDate,
				},
				{
					headers: {
						Authorization: token,
					},
				}
			)
			.then((data) => {
				console.log(data);
				setTask("");
				setIsRunning(false);
				setIsPaused(false);
				setElapsedTime(0);
			})

			.catch((err) => {
				console.error(err);
				if (err.response) {
					console.error("Response error:", err.response.data);
				}
			});
	};

	function formatTime() {
		let hours = Math.floor(elapsedTime / 3600000);
		let minutes = Math.floor((elapsedTime % 3600000) / 60000);
		let seconds = Math.floor((elapsedTime % 60000) / 1000);

		hours = String(hours).padStart(2, "0");
		minutes = String(minutes).padStart(2, "0");
		seconds = String(seconds).padStart(2, "0");

		return `${hours}:${minutes}:${seconds}`;
	}

	return (
		<div className="h-full w-full">
			<div className="flex flex-col items-center h-full">
				<div className="flex flex-col items-center p-[30px] h-screen">
					<div
						className={`text-[200px] font-mono font-bold ${
							isRunning ? "text-gray-300" : "text-slate-400"
						} mt-40`}
					>
						{formatTime()}
					</div>
					<div className="text-gray-300">
						<p className="tracking-widest mb-10 -mt-10 text-xl">
							{currentDate}
						</p>
					</div>

					<div className="controlButton flex space-x-4">
						{isPaused && (
							<div className="flex items-center space-x-4 flex-col">
								<Textarea
									placeholder="Type your message here."
									value={task}
									onChange={(e) => setTask(e.target.value)}
								/>
								<Button onClick={handleSubmit} className="mt-10 w-40">
									Submit
								</Button>
							</div>
						)}
						{!isRunning && !isPaused && (
							<Button onClick={start} className="w-40">
								Start
							</Button>
						)}
						{isRunning && (
							<Button onClick={stop} className="w-40">
								Stop
							</Button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
