import { useContext } from "react";
import { SocketContext } from "../contexts/SocketContext";

export const useSocketContext = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw Error("useSocketContext must be used inside components that have access to the SocketContext");
    }
    return context;
}