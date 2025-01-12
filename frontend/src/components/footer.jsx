import { RiTwitterXLine } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";

export function Footer() {
	return (
		<div>
			<p>
				<footer className="bg-gray-800 text-white py-4">
					<div className="container mx-auto px-4">
						<p className="text-center text-sm mb-4">
							Created by Aditya Pant and Kirti
						</p>
						<div className="flex justify-center space-x-8">
							{/* Your Profiles */}
							<div>
								<p className="text-yellow-400 font-semibold text-center">
									Aditya
								</p>
								<div className="flex flex-col items-center space-y-2">
									<a
										href="https://github.com/AdityaaPant"
										target="_blank"
										rel="noopener noreferrer"
										className="hover:text-yellow-400 transition-colors"
									>
										<FaGithub />
									</a>
									<a
										href="https://x.com/adityapant_ "
										target="_blank"
										rel="noopener noreferrer"
										className="hover:text-yellow-400 transition-colors"
									>
										<RiTwitterXLine />
									</a>
									<a
										href="https://www.instagram.com/adityapant_/ "
										target="_blank"
										rel="noopener noreferrer"
										className="hover:text-yellow-400 transition-colors"
									>
										<GrInstagram />
									</a>
								</div>
							</div>

							{/* Friend's Profiles */}
							<div>
								<p className="text-yellow-400 font-semibold text-center">
									Kirti
								</p>
								<div className="flex flex-col items-center space-y-2">
									<a
										href="https://github.com/kirti253"
										target="_blank"
										rel="noopener noreferrer"
										className="hover:text-yellow-400 transition-colors"
									>
										<FaGithub />
									</a>
									<a
										href="https://x.com/Kirti_253"
										target="_blank"
										rel="noopener noreferrer"
										className="hover:text-yellow-400 transition-colors"
									>
										<RiTwitterXLine />
									</a>
									<a
										href="https://www.instagram.com/_kkirtiii_/"
										target="_blank"
										rel="noopener noreferrer"
										className="hover:text-yellow-400 transition-colors"
									>
										<GrInstagram />
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
