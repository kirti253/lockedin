export function Navbar() {
	return (
		<div className="h-screen ">
			<div className=" text-gray-300 flex justify-center  flex-col w-11/12 mx-auto mt-10">
				<div className="white-background  mb-4">
					<p className="w-[100px] text-center">Sr.no</p>
					<p className="w-[150px] text-center">Date</p>
					<p className="flex-auto text-left">Title</p>
					<p className="w-[150px] text-center">Duration</p>
				</div>
				<div className="white-background  bg-[url('')]">
					<p className="w-[100px] text-center">1</p>
					<p className="w-[150px]  text-center">25 Jan 2025</p>
					<p
						className="flex-auto text-left"
						style={{
							width: "200px", // Set the width for text truncation
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "ellipsis",
						}}
					>
						100 days of Code <br />
						this is some test sentence this is some test sentence this is some
						test sentence this is some test sentence
						<br />
						helo
					</p>
					<p className="w-[150px] text-center">2 hours</p>
				</div>
				<div className="white-background  bg-[url('')]">
					<p className="w-[100px] text-center">2</p>
					<p className="w-[150px]  text-center">25 Jan 2025</p>
					<p
						className="flex-auto text-left"
						style={{
							width: "200px", // Set the width for text truncation
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "ellipsis",
						}}
					>
						this is some test sentence
						<br />
						helo
					</p>
					<p className="w-[150px] text-center">2 hours</p>
				</div>
			</div>
		</div>
	);
}
