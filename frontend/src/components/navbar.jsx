export function Navbar() {
	return (
		<div className="text-white flex justify-center">
			<div className="flex rounded-lg border-y border-x w-3/4 px-4 p-4  hover:bg-white hover:ease-in hover:duration-700 mt-5">
				<p className="w-[100px]">Sr.no</p>
				<p className="w-[150px]">Date</p>
				<p className="flex-auto">Description</p>
				<p className="w-[100px]">Duration</p>
			</div>
		</div>
	);
}
