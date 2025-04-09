import { useEffect,useRef,useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import useConversation from "../hooks/useConversation";
import useSendMessage from '../hooks/useSendMessage';
import useGetMessages from '../hooks/useGetMessages';
import Message from "./Message";
import { Sidebar } from "./Sidebar";
import useListenMessages from "../hooks/useListenMessages";

const Home = () => {
    const [message,setMessage] = useState('');

    const {user} = useAuthContext();
    const {selectedConversation,setSelectedConversation} = useConversation();
    useListenMessages();
    const {sendMessage,loading} = useSendMessage()
    const {messages,loading:msgsloading} = useGetMessages();

    //make sure the selectedConversation will be null when you logout and login again : 
    useEffect(()=>{
      return ()=>setSelectedConversation(null)
    },[setSelectedConversation]) //***********************/

    const handleSendMsg = async (e) => {
      e.preventDefault();
      if (!message || message.length == 0) {
        return
      }
      await sendMessage(message);
      setMessage('');
    }

    return (
        <div className="flex h-screen bg-gray-100">
          <Sidebar/>
          {/* Chat Area */}
          {
          !selectedConversation ? 
          //If no Conversation is selected :
          <>
            <div className="m-auto text-orange-500">
              Welcome, {user._doc.username}. <span className="text-blue-600">Select a conversation!</span>
            </div>
          </>
            :
          //If a conversation is selected :
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="bg-orange-500 text-white p-4 text-lg font-semibold">
              <div className="w-25 flex justify-between">
                <img src={selectedConversation.profilePic} className="w-8"/>
                  {selectedConversation.username}
              </div>
            </div>
            {/* Messages */}
            <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-blue-100">
              {msgsloading && <>loading...</>}
              {!loading && messages.length===0 && (
              <div className='flex justify-between w-45'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 2L11 13" />
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                </svg>
                <p className=''>Start a conversation</p>
              </div>
              )}
              {!loading && messages.length>0 && (
                messages.map(m=>(
                  <Message sender={m.senderId === user._doc._id ? 'me' : 'other'} text={m.message} />
                  // <Message sender="me" text="I'm good! How about you?" />
                ))
              )}
            </div>
            {/* Chat Input */}
            <form className="p-4 bg-white flex items-center gap-2 shadow-lg" onSubmit={handleSendMsg}>
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                value={message}
                onChange={e=>setMessage(e.target.value)}
              />
              <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
                Send
              </button>
            </form>
          </div>}
        </div>
  );
}

export default Home;