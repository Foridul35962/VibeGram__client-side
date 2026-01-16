import React, { useState } from 'react';
import { Search as SearchIcon, X, User, ArrowRight } from 'lucide-react';
import { useSelector } from 'react-redux';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { searchUser } = useSelector((state) => state.user);

  const handleClear = () => setSearchTerm('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      console.log("Searching for:", searchTerm);
      // Your dispatch logic here
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center pt-16 px-6">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-3">
          Search Community
        </h1>
        <p className="text-gray-400 text-md max-w-md mx-auto">
          Connect with creators and friends across the platform.
        </p>
      </div>

      {/* Search Bar Container */}
      <div className="w-full max-w-2xl">
        <form onSubmit={handleSearch} className="relative group mb-12">
          <div className="relative flex items-center">
            <div className="absolute left-5 text-gray-500 group-focus-within:text-blue-500 transition-colors">
              <SearchIcon size={20} />
            </div>

            <input
              type="text"
              placeholder="Search by name or username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-14 pl-12 pr-36 rounded-2xl border border-zinc-800 bg-zinc-900 text-white placeholder-gray-500 shadow-2xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none text-md transition-all"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-28 p-2 text-gray-500 hover:text-white"
              >
                <X size={18} />
              </button>
            )}

            <button 
              type="submit"
              className="absolute right-2.5 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl font-semibold transition-all active:scale-95 shadow-lg shadow-blue-900/20"
            >
              Search
            </button>
          </div>
        </form>

        {/* User Results Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-lg font-semibold text-gray-200">
              Results
            </h2>
            <span className="text-xs font-medium bg-zinc-800 text-gray-400 px-3 py-1 rounded-full border border-zinc-700">
              {searchUser?.length || 0} found
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {searchUser && searchUser.length > 0 ? (
              searchUser.map((user) => (
                <div 
                  key={user._id || user.id} 
                  className="group bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-blue-400 overflow-hidden border border-zinc-700 group-hover:border-blue-500/50 transition-colors">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        <User size={24} />
                      )}
                    </div>
                    
                    {/* User Info */}
                    <div>
                      <h3 className="font-bold text-gray-100 group-hover:text-white transition-colors line-clamp-1">
                        {user.name || "Unknown User"}
                      </h3>
                      <p className="text-sm text-gray-500">@{user.username || "username"}</p>
                    </div>
                  </div>

                  <button className="p-2 bg-zinc-800 rounded-lg text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <ArrowRight size={18} />
                  </button>
                </div>
              ))
            ) : (
              /* Empty State */
              <div className="col-span-full py-20 text-center border-2 border-dashed border-zinc-900 rounded-3xl">
                <div className="bg-zinc-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-700">
                  <SearchIcon size={30} />
                </div>
                <h3 className="text-gray-400 font-medium">No results to show</h3>
                <p className="text-gray-600 text-sm">Start typing to find people</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;