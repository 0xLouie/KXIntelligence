import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FilterBarProps {
  filters: {
    amountMin: number;
    amountMax: number;
    transactionTypes: string[];
    showExchanges: boolean;
    showUnknown: boolean;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    amountMin: number;
    amountMax: number;
    transactionTypes: string[];
    showExchanges: boolean;
    showUnknown: boolean;
  }>>;
  dateRange: string;
  setDateRange: React.Dispatch<React.SetStateAction<string>>;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, setFilters, dateRange, setDateRange }) => {
  const [expanded, setExpanded] = useState(false);
  
  const handleTransactionTypeToggle = (type: string) => {
    setFilters(prev => {
      if (prev.transactionTypes.includes(type)) {
        return {
          ...prev,
          transactionTypes: prev.transactionTypes.filter(t => t !== type)
        };
      } else {
        return {
          ...prev,
          transactionTypes: [...prev.transactionTypes, type]
        };
      }
    });
  };
  
  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden">
      <div 
        className="px-4 py-3 flex justify-between items-center cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center">
          <span className="text-sm font-medium">Filters</span>
          <span className="ml-2 text-xs bg-indigo-900/50 text-indigo-300 rounded px-2 py-0.5">
            3 active
          </span>
        </div>
        <button>
          {expanded ? 
            <ChevronUp className="h-5 w-5 text-gray-400" /> : 
            <ChevronDown className="h-5 w-5 text-gray-400" />
          }
        </button>
      </div>
      
      {expanded && (
        <div className="px-4 py-3 border-t border-gray-800 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Amount Range (SOL)</h3>
            <div className="flex items-center space-x-2">
              <input 
                type="number" 
                value={filters.amountMin}
                onChange={(e) => setFilters(prev => ({ ...prev, amountMin: Number(e.target.value) }))}
                className="w-full bg-gray-800 border border-gray-700 rounded py-1 px-2 text-white text-sm"
                min="0"
              />
              <span className="text-gray-500">to</span>
              <input 
                type="number" 
                value={filters.amountMax}
                onChange={(e) => setFilters(prev => ({ ...prev, amountMax: Number(e.target.value) }))}
                className="w-full bg-gray-800 border border-gray-700 rounded py-1 px-2 text-white text-sm"
                min="0"
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Transaction Types</h3>
            <div className="space-y-1">
              {['Transfer', 'Swap', 'Liquidity', 'NFT'].map(type => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.transactionTypes.includes(type.toLowerCase())}
                    onChange={() => handleTransactionTypeToggle(type.toLowerCase())}
                    className="rounded border-gray-700 text-indigo-600 focus:ring-indigo-500 bg-gray-800"
                  />
                  <span className="ml-2 text-sm text-gray-300">{type}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Date Range</h3>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded py-1 px-2 text-white text-sm"
            >
              <option value="all">All Time</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Wallet Types</h3>
            <div className="space-y-1">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.showExchanges}
                  onChange={() => setFilters(prev => ({ ...prev, showExchanges: !prev.showExchanges }))}
                  className="rounded border-gray-700 text-indigo-600 focus:ring-indigo-500 bg-gray-800"
                />
                <span className="ml-2 text-sm text-gray-300">Exchanges</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.showUnknown}
                  onChange={() => setFilters(prev => ({ ...prev, showUnknown: !prev.showUnknown }))}
                  className="rounded border-gray-700 text-indigo-600 focus:ring-indigo-500 bg-gray-800"
                />
                <span className="ml-2 text-sm text-gray-300">Unknown Wallets</span>
              </label>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button className="text-xs text-indigo-400 hover:text-indigo-300">
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;