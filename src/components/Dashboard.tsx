import React, { useState } from 'react';
import TransactionFlow from './TransactionFlow';
import WalletList from './WalletList';
import TransactionList from './TransactionList';
import FilterBar from './FilterBar';
import FundingAnalysis from './FundingAnalysis';
import { 
  Download, 
  BarChart3, 
  Network, 
  List,
  Layers,
  Filter,
  Calendar,
  AlertTriangle
} from 'lucide-react';

interface DashboardProps {
  searchQuery: string;
  analysisData: any;
}

const Dashboard: React.FC<DashboardProps> = ({ searchQuery, analysisData }) => {
  const [activeTab, setActiveTab] = useState<string>('flow');
  const [dateRange, setDateRange] = useState<string>('all');
  const [filters, setFilters] = useState({
    amountMin: 0,
    amountMax: 10000,
    transactionTypes: ['all'],
    showExchanges: true,
    showUnknown: true
  });

  const suspiciousCount = analysisData.exchangeOutflows.reduce(
    (count, exchange) => count + exchange.transactions.filter(tx => tx.suspicious).length,
    0
  );

  return (
    <div className="mt-6 fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <div className="flex items-center">
            <h2 className="text-xl font-medium">Analysis Results</h2>
            <span className="ml-3 px-2 py-1 text-xs bg-indigo-900/50 text-indigo-300 rounded">
              {analysisData.wallets.length} Wallets
            </span>
            <span className="ml-2 px-2 py-1 text-xs bg-indigo-900/50 text-indigo-300 rounded">
              {analysisData.transactions.length} Transactions
            </span>
            {suspiciousCount > 0 && (
              <span className="ml-2 px-2 py-1 text-xs bg-red-900/50 text-red-300 rounded flex items-center">
                <AlertTriangle className="h-3 w-3 mr-1" />
                {suspiciousCount} Suspicious Flows
              </span>
            )}
          </div>
          <p className="text-gray-400 text-sm mt-1 mono">
            {searchQuery.length > 40 ? `${searchQuery.substring(0, 40)}...` : searchQuery}
          </p>
        </div>
        
        <div className="flex mt-4 md:mt-0 space-x-2">
          <button className="bg-gray-800/50 hover:bg-gray-700/50 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Last 30 days</span>
          </button>
          <button className="bg-gray-800/50 hover:bg-gray-700/50 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            <span>Filters</span>
          </button>
          <button className="bg-gray-800/50 hover:bg-gray-700/50 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center">
            <Download className="h-4 w-4 mr-2" />
            <span>Export</span>
          </button>
        </div>
      </div>
      
      <FilterBar 
        filters={filters} 
        setFilters={setFilters} 
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      <div className="mt-6">
        <FundingAnalysis 
          sourceWalletFunding={analysisData.sourceWalletFunding}
          exchangeOutflows={analysisData.exchangeOutflows}
        />
      </div>
      
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden mt-6">
        <div className="flex border-b border-gray-800">
          <button
            className={`px-6 py-3 text-sm font-medium flex items-center transition-colors ${
              activeTab === 'flow' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
            onClick={() => setActiveTab('flow')}
          >
            <Network className="h-4 w-4 mr-2" />
            Transaction Flow
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium flex items-center transition-colors ${
              activeTab === 'transactions' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
            onClick={() => setActiveTab('transactions')}
          >
            <List className="h-4 w-4 mr-2" />
            Transactions
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium flex items-center transition-colors ${
              activeTab === 'wallets' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
            onClick={() => setActiveTab('wallets')}
          >
            <Layers className="h-4 w-4 mr-2" />
            Wallets
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium flex items-center transition-colors ${
              activeTab === 'stats' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
            onClick={() => setActiveTab('stats')}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Statistics
          </button>
        </div>
        
        <div className="p-4 h-[600px] overflow-auto scrollbar-thin">
          {activeTab === 'flow' && <TransactionFlow data={analysisData} />}
          {activeTab === 'transactions' && <TransactionList transactions={analysisData.transactions} />}
          {activeTab === 'wallets' && <WalletList wallets={analysisData.wallets} />}
          {activeTab === 'stats' && (
            <div className="h-full flex items-center justify-center text-gray-400">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 mx-auto mb-4 text-gray-600" />
                <p>Statistics view is available in the premium version</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;