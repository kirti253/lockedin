import { FaLocationDot } from "react-icons/fa6";
import { RiTwitterXLine } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";

export function Footer() {
	return (
		<div className="text-white flex justify-evenly w-3/4 mx-auto mt-6 ">
			<div className="w-1/4 mr-5 text-3xl font-bold">
				<p>Explore the beauty of effective time management with us</p>
			</div>
			<div className="w-1/2 mr-12 tracking-widest mt-2  text-right">
				<p className="flex justify-end">
					<FaLocationDot className="mt-1 mr-2" />
					Chandigarh
				</p>
			</div>
			<div className="flex flex-col">
				<div className="flex ">
					<p className="mr-11">hey@adityapant.com</p>
					<a href="https://x.com/adityapant_">
						{" "}
						<RiTwitterXLine />{" "}
					</a>
					<p>
						<link href=""></link>
					</p>
					<p>
						<FaGithub size={15} className="mr-6 mt-1" />
					</p>
					<p>
						<GrInstagram size={15} className="mr-6 mt-1" />
					</p>
				</div>
				<div className="flex ">
					<p className="mr-6">kirti25032007@gmail.com</p>

					<p>
						<RiTwitterXLine size={15} className="mr-6 mt-1" />
					</p>
					<p>
						<FaGithub size={15} className="mr-6 mt-1" />
					</p>
					<p>
						<GrInstagram size={15} className="mr-6 mt-1" />
					</p>
				</div>
			</div>
		</div>
	);
}
