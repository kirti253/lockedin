export default function SignUp() {
  return (
    <div className=" flex items-center justify-center text-white">
      <div className="flex justify-center items-center bg-gray-800 p-8 rounded-lg  ">
        <img className="w-1/2 rounded-md" src="/src/assets/signup.jpg" />

        <div className="flex flex-col justify-evenly ml-7 space-y-7">
          <div>
            <p className="block text-sm font-medium mb-1">Username</p>
            <input
              className="w-60 p-2 rounded-md border border-gray-300   text-black"
              type="text"
              placeholder="username"
            />
          </div>
          <div>
            <p className="block text-sm font-medium mb-1">Email</p>
            <input
              className="w-60 p-2 rounded-md border border-gray-300   text-black"
              type="email"
              placeholder="hey@Adityapant.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              className="w-60 p-2 rounded-md border border-gray-300  text-black"
              type="password"
              placeholder="password"
            />
          </div>
          <button className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md ">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
