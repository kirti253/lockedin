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

export default function Card() {
	return (
		<div
			className="h-screen
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
					<TableRow>
						<TableCell className="font-medium">1</TableCell>
						<TableCell>12/20/2025</TableCell>
						<TableCell>
							X post <br /> 100days of code <br />
							canteen
						</TableCell>
						<TableCell className="text-right">12 HRS</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="font-medium">3</TableCell>
						<TableCell>12/20/2025</TableCell>
						<TableCell className="w-2/3 ">
							Title lamba hota h to left to right read krna easy hoje gTitle
							lamba hota h to left to right read krna easy hoje gTitle lamba
							hota h to left to right read krna easy hoje gTitle lamba hota h to
							left to right read krna easy hoje gTitle lamba hota h to left to
							right read krna easy hoje g
						</TableCell>
						<TableCell className="text-right">12 HRS</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="font-medium">2</TableCell>
						<TableCell>12/20/2025</TableCell>
						<TableCell>
							X post <br /> 100days of code <br />
							canteen
						</TableCell>
						<TableCell className="text-right">12 HRS</TableCell>
					</TableRow>
				</TableBody>
			</Table>
			;<div></div>
		</div>
	);
}
