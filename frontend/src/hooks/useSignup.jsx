import {useState} from 'react';
import {useAuthContext} from './useAuthContext';

export const useSignup = () => {
    const [error,setError] = useState(null);
    const [isloading,setIsloading] = useState(false);
    const {dispatch} = useAuthContext();
    const signup = async (username,fullname,password,gender) => {
        setIsloading(true);
        setError(null);
        const resp = await fetch('http://localhost:4000/api/auth/signup',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({fullname,username,password,gender})
        });
        const json = await resp.json();
        console.log(json);
        if (!resp.ok){
            setIsloading(false);
            setError(json.error);
        }
        if (resp.ok)    {
            localStorage.setItem('chatuser',JSON.stringify(json));
            dispatch({type:"LOGIN",payload:json});
            setIsloading(false);
        }
    }
    return {signup,error,isloading}
}