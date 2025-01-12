import { RiTwitterXLine } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";

export function Footer() {
	return (
		<div>
			<p>
				<footer className="bg-transparent text-white py-4 border-t-2  border-gray-700">
					<div className="container mx-auto px-4">
						<p className="text-center text-sm mb-4 tracking-wider">
							Created by Aditya Pant and Kirti
						</p>
						<div className="flex justify-center space-x-8">
							{/* Your Profiles */}
							<div className="mr-20">
								<p className="font-semibold text-center tracking-wider">
									Aditya
								</p>
								<div className="flex justify-between w-20 mt-5 ">
									<a
										href="https://github.com/AdityaaPant"
										target="_blank"
										rel="noopener noreferrer"
										className=" transition-colors"
									>
										<FaGithub size={20} />
									</a>
									<a
										href="https://x.com/adityapant_ "
										target="_blank"
										rel="noopener noreferrer"
										className=" transition-colors"
									>
										<RiTwitterXLine size={20} />
									</a>
									<a
										href="https://www.instagram.com/adityapant_/ "
										target="_blank"
										rel="noopener noreferrer"
										className=" transition-colors"
									>
										<GrInstagram size={20} />
									</a>
								</div>
							</div>

							{/* Friend's Profiles */}
							<div className="">
								<p className="0 font-semibold text-center tracking-wider">
									Kirti
								</p>
								<div className="flex  justify-between  w-20 mt-5">
									<a
										href="https://github.com/kirti253"
										target="_blank"
										rel="noopener noreferrer"
										className=" transition-colors"
									>
										<FaGithub size={20} />
									</a>
									<a
										href="https://x.com/Kirti_253"
										target="_blank"
										rel="noopener noreferrer"
										className=" transition-colors"
									>
										<RiTwitterXLine size={20} />
									</a>
									<a
										href="https://www.instagram.com/_kkirtiii_/"
										target="_blank"
										rel="noopener noreferrer"
										className=" transition-colors"
									>
										<GrInstagram size={20} />
									</a>
								</div>
							</div>
						</div>
					</div>
				</footer>
			</p>
		</div>
	);
}
