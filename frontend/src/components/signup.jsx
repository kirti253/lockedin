import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

const Register = () => {
	const userRef = useRef();
	const errRef = useRef();

	const [user, setUser] = useState("");
	const [validName, setValidName] = useState(false);
	const [userFocus, setUserFocus] = useState(false);

	const [pwd, setPwd] = useState("");
	const [validPwd, setValidPwd] = useState(false);
	const [pwdFocus, setPwdFocus] = useState(false);

	const [matchPwd, setMatchPwd] = useState("");
	const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	const [errMsg, setErrMsg] = useState("");
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		setValidName(USER_REGEX.test(user));
	}, [user]);

	useEffect(() => {
		setValidPwd(PWD_REGEX.test(pwd));
		setValidMatch(pwd === matchPwd);
	}, [pwd, matchPwd]);

	useEffect(() => {
		setErrMsg("");
	}, [user, pwd, matchPwd]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// if button enabled with JS hack
		const v1 = USER_REGEX.test(user);
		const v2 = PWD_REGEX.test(pwd);
		if (!v1 || !v2) {
			setErrMsg("Invalid Entry");
			return;
		}
		try {
			const response = await axios.post(
				REGISTER_URL,
				JSON.stringify({ user, pwd }),
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			);
			console.log(response?.data);
			console.log(response?.accessToken);
			console.log(JSON.stringify(response));
			setSuccess(true);
			//clear state and controlled inputs
			//need value attrib on inputs for this
			setUser("");
			setPwd("");
			setMatchPwd("");
		} catch (err) {
			if (!err?.response) {
				setErrMsg("No Server Response");
			} else if (err.response?.status === 409) {
				setErrMsg("Username Taken");
			} else {
				setErrMsg("Registration Failed");
			}
			errRef.current.focus();
		}
	};
};

export default function SignUp() {
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
					<Button className="mt-10">Submit</Button>
				</div>
			</div>
		</div>
	);
}
