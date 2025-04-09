const Message = ({sender,text}) => {
    return (
        <div className={`flex ${sender === "me" ? "justify-end" : "justify-start"}`}>
            <div className={`px-4 py-2 rounded-lg max-w-xs pb-2 ${
                sender === "me" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
            }`}>
                {text}
            </div>
        </div>
    )
}

export default Message;