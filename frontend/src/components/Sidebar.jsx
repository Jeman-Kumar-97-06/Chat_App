import { useLogout } from "../hooks/useLogout";
import SearchBar from "./SearchBar";
import SidebarItem from "./SidebarItem";
import { useAuthContext } from "../hooks/useAuthContext";
import useGetConvos from "../hooks/useGetConvos";

export const Sidebar = () => {
    const {logout} = useLogout()
    const {loading,convos} = useGetConvos();
    const {user} = useAuthContext();

    return (
        <div className="w-64 bg-white shadow-lg p-4 flex flex-col">
            <h2 className="text-2xl font-bold text-orange-500 mb-6">Chat App</h2>        
            <nav className="flex-1 space-y-4">
                {/* Search bar to search for users */}
                <SearchBar/>
                {convos.map(c=>(
                    <SidebarItem conversation={c}/>
                ))}
                {loading ? <span>Loading ...</span> : null}
            </nav>
            <button className="mt-auto bg-red-500 text-white py-2 rounded-lg hover:bg-red-600" onClick={logout}>
                Logout
            </button>
        </div>
    )
}