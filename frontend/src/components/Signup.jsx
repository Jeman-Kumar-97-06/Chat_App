import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
    const [err,setErr]       = useState(null);
    const [fullname,setFullname] = useState(null);
    const [username,setUsername] = useState(null);
    const [password,setPassword] = useState(null);
    const [gender,setGender]     = useState(null);
    const {signup,error,isloading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!fullname || !username || !password || !gender) {
            setErr("Make sure no field is empty!")
            return;
        }
        await signup(fullname,username,password,gender);
    }
    return (
        <div className="flex h-screen items-center justify-center bg-gradient-to-br from-orange-500 to-orange-700">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
          <h2 className="text-2xl font-bold text-gray-800 text-center">Sign Up</h2>
          <form className="mt-6" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Fullname"
              onChange={e=>{setFullname(e.target.value)}}
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="text"
              placeholder="Username"
              onChange={e=>{setUsername(e.target.value)}}
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="password"
              placeholder="Password"
              onChange={e=>{setPassword(e.target.value)}}
              className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <select className='mb-4' onChange={e=>{setGender(e.target.value)}}>
                <option value={null}>Select Gender</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
            </select>
            <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition">
              Sign Up
            </button>
          </form>
          {error && <span className="text-red-500">*{error}</span>}
          {err && <span className="text-red-500">*{err}</span>}
          <p className="text-sm text-gray-600 mt-4 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-orange-500 font-semibold">
              Login
            </a>
          </p>
        </div>
      </div>
    )
};

export default Signup;