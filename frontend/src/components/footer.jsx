import { RiTwitterXLine } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";

export default function Footer() {
	return (
		<footer className="bg-black text-white py-8 border-t border-gray-700">
			<div className="container mx-auto px-4">
				{/* Footer Top Section */}
				<div className="flex flex-col md:flex-row justify-center items-center text-center ">
					<div className="mb-6 md:mb-0">
						<p className="text-sm tracking-wider font-light">
							Created by <span className="font-medium">Aditya Pant</span> and{" "}
							<span className="font-medium">Kirti</span>
						</p>
					</div>
				</div>

				{/* Social Links Section */}
				<div className="flex  md:flex-row justify-between items-center mt-6">
					{/* Aditya's Profiles */}
					<div className="mb-6 md:mb-0">
						<p className="font-semibold text-center  tracking-wider">Aditya</p>
						<div className="flex justify-center md:justify-start space-x-4 mt-2">
							<a
								href="https://github.com/AdityaaPant"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-gray-400 transition-colors"
							>
								<FaGithub size={24} />
							</a>
							<a
								href="https://x.com/adityapant_"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-gray-400 transition-colors"
							>
								<RiTwitterXLine size={24} />
							</a>
							<a
								href="https://www.instagram.com/adityapant_/"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-gray-400 transition-colors"
							>
								<GrInstagram size={24} />
							</a>
						</div>
					</div>

					{/* Kirti's Profiles */}
					<div className="mb-6 md:mb-0">
						<p className="font-semibold text-center  tracking-wider">Kirti</p>
						<div className="flex justify-center md:justify-start space-x-4 mt-2">
							<a
								href="https://github.com/kirti253"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-gray-400 transition-colors"
							>
								<FaGithub size={24} />
							</a>
							<a
								href="https://x.com/Kirti_253"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-gray-400 transition-colors"
							>
								<RiTwitterXLine size={24} />
							</a>
							<a
								href="https://www.instagram.com/_kkirtiii_/"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-gray-400 transition-colors"
							>
								<GrInstagram size={24} />
							</a>
						</div>
					</div>
				</div>
			</div>

			{/* Footer Bottom Section */}
		</footer>
	);
}
