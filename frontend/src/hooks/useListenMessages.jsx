import { useEffect } from "react";
import useConversation from "./useConversation";
import { useSocketContext } from "./useSocketContext";


const useListenMessages = () => {
    const {socket} = useSocketContext();
    const {messages,setMessages} = useConversation();
    useEffect(()=>{
        socket?.on('newMessage',(newMessage)=>{
         setMessages([...messages,newMessage]);
        });
        return () => socket?.off('newMessage');
    },[socket,setMessages,messages]);
};

export default useListenMessages;