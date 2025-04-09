import useConversation from "../hooks/useConversation";
import { useSocketContext } from "../hooks/useSocketContext";

export default function SidebarItem({ conversation }) {
    const {onlineUsers} = useSocketContext();
    //See if the present conversation (among other conversations) is inclueded in onlineUsers array.
    const isOnline      = onlineUsers.includes(conversation._id);
    const {selectedConversation,setSelectedConversation} = useConversation();
    //check if the current conversation is the selectedConversation among the array of conversations :
    const isSelected = selectedConversation?._id === conversation._id;
    return (
      // The onClick will set the selectedConversation the the current conversation when clicked :
      <div onClick={()=>{setSelectedConversation(conversation)}} className={`p-3 rounded-lg cursor-pointer ${isOnline ? 'border-green-500 border-[3px]' : ''} ${
        isSelected ? "bg-orange-100 text-orange-500 font-bold" : "hover:bg-gray-200"
      }`}>
        <div className="w-24 flex justify-between">
            <img src={conversation.profilePic} className="w-8"/>
            {conversation.username}
        </div>
      </div>
    );
  }