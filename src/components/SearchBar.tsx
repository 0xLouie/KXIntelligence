import React, { useState } from 'react';
import { Search, X, Clock, ArrowRight } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  error: string | null;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, error }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [showHistory, setShowHistory] = useState<boolean>(false);
  
  // Mock search history
  const searchHistory = [
    '9xQFa1DCYkaAnW1z58zpHVABmiZXGHC9mMnmb2NKbvY1',
    '2ZJzKfWyf3bwgRsKxmWGxGkVouhfsySi2XJiTzUdfuW8',
    '3SZ7dpXCJcest95Axr9Nc1xJBnZ9fWNfNgq1Z678XUdR',
    'https://solscan.io/tx/2UcUWdH7yNDnf7Dm1fFpHFNVfsXHbLKyNJxbTzymSjnNaT2L7UeCsSBuacjtmn7dp8iWALcke6MtFdNfCc8mYzWP',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue);
    setShowHistory(false);
  };

  const handleHistorySelect = (item: string) => {
    setInputValue(item);
    setShowHistory(false);
    onSearch(item);
  };

  const handleClear = () => {
    setInputValue('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 mb-10 relative">
      <div className="glassmorphism rounded-xl p-4">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex items-center relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4" />
            
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setShowHistory(true)}
              placeholder="Enter Solana address or Solscan transaction ID/URL"
              className="w-full bg-gray-900/50 text-white pl-12 pr-36 py-4 rounded-lg border border-gray-700/50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all"
            />
            
            {inputValue && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-[120px] p-2 rounded-lg hover:bg-gray-800/50 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            
            <button
              type="submit"
              className="absolute right-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-medium transition-colors flex items-center"
            >
              Analyze <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </form>
        
        {error && (
          <div className="mt-2 text-red-400 text-sm pl-4">{error}</div>
        )}
        
        <div className="mt-3 flex flex-wrap gap-2 px-4">
          <span className="text-xs text-gray-500">Try:</span>
          <button 
            className="text-xs bg-gray-800/50 hover:bg-gray-700/50 px-2 py-1 rounded text-gray-300 transition-colors"
            onClick={() => setInputValue('5SGn9JZLyvCF7nXPsHtfXjvrRuBmDDQmgM24AHyKZvEM')}
          >
            Sample Wallet
          </button>
          <button 
            className="text-xs bg-gray-800/50 hover:bg-gray-700/50 px-2 py-1 rounded text-gray-300 transition-colors"
            onClick={() => setInputValue('https://solscan.io/tx/2UcUWdH7yNDnf7Dm1fFpHFNVfsXHbLKyNJxbTzymSjnNaT2L7UeCsSBuacjtmn7dp8iWALcke6MtFdNfCc8mYzWP')}
          >
            Sample Transaction
          </button>
        </div>
      </div>
      
      {showHistory && searchHistory.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-gray-900/90 border border-gray-700/50 rounded-lg shadow-xl fade-in backdrop-blur-sm">
          <div className="p-3 border-b border-gray-800 flex justify-between items-center">
            <span className="text-sm text-gray-400 flex items-center">
              <Clock className="w-4 h-4 mr-2" /> Recent searches
            </span>
            <button 
              className="text-xs text-gray-500 hover:text-gray-300"
              onClick={() => setShowHistory(false)}
            >
              Close
            </button>
          </div>
          <ul>
            {searchHistory.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleHistorySelect(item)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-800/50 flex items-center text-gray-300"
                >
                  <Clock className="w-4 h-4 mr-3 text-gray-500" />
                  <span className="mono text-sm truncate">{item}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;