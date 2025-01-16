import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useState, useEffect } from "react";

const formatDuration = (durationInMs) => {
	const totalSeconds = Math.floor(durationInMs / 1000);
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = Math.floor(totalSeconds % 60);

	// Return the formatted string as "HH:mm"
	return `${hours}:${minutes.toString().padStart(2, "0")}`;
};

export default function Card() {
	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchTasks = async () => {
		try {
			const token = localStorage.getItem("token");
			if (!token) {
				throw new Error("Token is missing . please log in");
			}
			const response = await axios.get("http://localhost:3000/tasklist/list", {
				headers: {
					Authorization: token,
				},
			});
			setTasks(response.data.tasks);
		} catch (err) {
			console.error("Error fetching tasks", err);
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchTasks();
	}, []);

	return (
		<div
			className="h-full mb-20
		"
		>
			<h2 className="text-muted-foreground    text-center">
				A list of your recent tasks.
			</h2>
			<Table className="w-11/12 mx-auto">
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Sr no</TableHead>
						<TableHead>Date</TableHead>
						<TableHead>Title</TableHead>
						<TableHead className="text-right">Time Duration</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{tasks.map((task, index) => (
						<TableRow key={task._id}>
							<TableCell className="font-medium">{index + 1}</TableCell>
							<TableCell>
								{task.date ? new Date(task.date).toLocaleDateString() : "N/A"}
							</TableCell>
							<TableCell>{task.title}</TableCell>
							<TableCell className="text-right">
								{formatDuration(task.duration)}{" "}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			;<div></div>
		</div>
	);
}
