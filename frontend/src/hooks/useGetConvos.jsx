import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { useAuthContext } from "./useAuthContext";

const useGetConvos = () => {
    const [loading,setLoading] = useState(false);
    const [convos,setConvos]   = useState([]);
    const {user}               = useAuthContext();
    console.log(user.token)
    useEffect(()=>{
        const getConvos = async () => {
            setLoading(true);
            try {
                const res  = await fetch('http://localhost:4000/api/users',{
                    headers:{"Authorization":`Bearer ${user.token}`}
                });
                const data = await res.json();
                if(data.error) {
                    throw new Error(data.error);
                }
                setConvos(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }
        getConvos();
    },[]);
    return {loading,convos}
};

export default useGetConvos;