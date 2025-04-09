import { useState } from "react";
import useConversation from "./useConversation";
import { useEffect } from "react";
import toast from "react-hot-toast";

const useGetMessages = () => {
    const [loading,setLoading] = useState(false);
    const {messages,setMessages,selectedConversation} = useConversation();
    useEffect(()=>{
        const getMessages = async () => {
            setLoading(true);
            try {
                const res  = await fetch(`http://localhost:4000/api/messages/${selectedConversation._id}`,{
                    headers:{"Authorization":`Bearer ${user.token}`}
                });
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                } 
                setMessages(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }
        if (selectedConversation?.id){
            getMessages();
        }
    },[selectedConversation?._id,setMessages]);
    return {messages,loading}
};

export default useGetMessages;