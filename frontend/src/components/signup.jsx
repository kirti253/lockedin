import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, useState, useEffect } from "react";
import axios from "axios";

export default function SignUp() {
	const [submitted, setIsSubmitted] = useState[false];

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div className="">
			<div className="flex  justify-center  border-[1px] w-fit rounded-md h-96 mx-auto mt-40 py-5">
				<img className=" rounded-md ml-5" src="/src/assets/signup.svg" />

				<div className="mx-10  flex  flex-col ">
					<p className="text-white text-center mt-5">Sign Up</p>
					<div>
						<p className="block text-sm font-medium mb-1">Username</p>
						<Input type="text" placeholder="Username" className="w-64" />
					</div>
					<div>
						<p className="block text-sm font-medium mb-1">Email</p>
						<Input type="email" placeholder="gmail" />
					</div>
					<div>
						<label className="block text-sm font-medium mb-1">Password</label>
						<Input type="password" placeholder="password" />
					</div>
					<Button type="submit" className="mt-10">
						Submit
					</Button>
				</div>
			</div>
		</div>
	);
}
