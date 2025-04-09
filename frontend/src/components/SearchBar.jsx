import { Search } from 'lucide-react';
import { useState } from 'react';
import useConversation from '../hooks/useConversation';
import useGetConvos from '../hooks/useGetConvos';
import toast from 'react-hot-toast';
const SearchBar = () => {
    const [query,setQuery] = useState(null);
    const {setSelectedConversation} = useConversation();
    const {convos} = useGetConvos();
    const handleSearch = (e) => {
      e.preventDefault();
      if (!query) {
        return;
      }
      if (query.length < 3) {
        toast.error("Search term must be at least 3 characters long");
      }
      //The following line goes through every user and sees if the user's fullname includes the string value of the query when we clicked submit:
      //True/False
      const convo = convos.find(c=>c.fullname.toLowerCase().includes(query.toLowerCase()));
      if (convo) {
        setSelectedConversation(convo);
        setQuery('');
      } else {
        toast.error("No suck user found!")
      }
    }
    return (
        <form className="relative w-full max-w-md" onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-4 py-2 border rounded-full shadow-sm pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type='submit'
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
            >
                <Search size={20} />
            </button>
        </form>
    )
};

export default SearchBar;