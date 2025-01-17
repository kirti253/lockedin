import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Button } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { useRefresh } from "./refresh";

const formatDuration = (durationInMs) => {
	const totalSeconds = Math.floor(durationInMs / 1000);
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = Math.floor(totalSeconds % 60);
	return `${hours}:${minutes.toString().padStart(2, "0")}`;
};

export default function Card() {
	const { refreshFlag } = useRefresh();
	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchTasks = async () => {
		try {
			const token = localStorage.getItem("token");
			if (!token) {
				throw new Error("Token is missing. Please log in.");
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

	useEffect(() => {
		if (refreshFlag) {
			fetchTasks();
		}
	}, [refreshFlag]);

	// Delete task functionality

	const handleDelete = async (taskId, e) => {
		try {
			const token = localStorage.getItem("token");
			if (!token) {
				throw new Error("Token is missing. Please log in.");
			}

			const response = await axios.delete(
				"http://localhost:3000/tasklist/deletetask",
				{
					headers: {
						Authorization: token,
					},
					data: { taskId },
				}
			);

			if (response.status === 200) {
				// Optimistic UI update
				setTasks((prevTasks) =>
					prevTasks.filter((task) => task._id !== taskId)
				);

				alert("Task deleted successfully");
			}
		} catch (error) {
			console.error("Error deleting task:", error);
			if (error.response) {
				alert(
					error.response.data.message ||
						"Failed to delete task. Please try again."
				);
			} else {
				alert("Failed to delete task. Please try again.");
			}
		}
		e.stopPropagation(); // Stopping propagation to avoid event interference
	};

	return (
		<div className="h-full mb-20">
			<h2 className="text-muted-foreground text-center">
				A list of your recent tasks.
			</h2>
			<Table className="w-11/12 mx-auto">
				<TableHeader>
					<TableRow>
						<TableHead className="w-[80px]">Sr no</TableHead>
						<TableHead className="w-[120px]">Date</TableHead>
						<TableHead>Title</TableHead>
						<TableHead className="text-right">Time Duration</TableHead>
						<TableHead className="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{tasks.map((task, index) => (
						<TableRow key={task._id}>
							{" "}
							{/* Ensure this key is correct */}
							<TableCell className="font-medium">{index + 1}</TableCell>
							<TableCell>
								{task.date ? new Date(task.date).toLocaleDateString() : "N/A"}
							</TableCell>
							<TableCell>{task.title}</TableCell>
							<TableCell className="text-right">
								{formatDuration(task.duration)}
							</TableCell>
							<TableCell
								className="text-right"
								onClick={(e) => {
									console.log("Delete button clicked");
									// handleDelete(task._id, e);
								}}
							>
								<Button className="text-red-500 hover:text-red-700">
									delete
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<button
				onClick={() => {
					console.log("Delete button clicked");
				}}
				className="text-red-500 hover:text-red-700"
				type="button"
			>
				delete
			</button>
		</div>
	);
}
