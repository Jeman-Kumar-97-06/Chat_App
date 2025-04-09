import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import { useState } from 'react';

const Login = () => {
    const [err,setErr]            = useState(null);
    const {login,error,isloading} = useLogin();
    const [username,setUsername]  = useState('');
    const [password,setPassword]  = useState('');

    const handleLogin = async (e) => {
        
        e.preventDefault();
        if (!username||!password) {
            setErr('Please fill all fields!');
            return;
        }
        await login(username,password);
    }

    return (
        <div className="flex h-screen items-center justify-center bg-gradient-to-br from-orange-500 to-orange-700">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
          <h2 className="text-2xl font-bold text-gray-800 text-center">Login</h2>
          <form className="mt-6" onSubmit={handleLogin}>
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
            <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition">
              Login
            </button>
          </form>
          {err && <span className='text-red-500'>*{err}</span>}
          {error && <span className='text-red-500'>*{error}</span>}
          <p className="text-sm text-gray-600 mt-4 text-center">
            Don't have an account?{" "}
            <a href="/signup" className="text-orange-500 font-semibold">
              Sign up
            </a>
          </p>
        </div>
      </div>
    )
};

export default Login;