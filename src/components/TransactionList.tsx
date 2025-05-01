import React, { useState } from 'react';
import { ExternalLink, ArrowRight, Search } from 'lucide-react';

interface TransactionListProps {
  transactions: any[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredTransactions = searchTerm 
    ? transactions.filter(tx => 
        tx.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.fromWallet.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.toWallet.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : transactions;
  
  return (
    <div>
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
        <input
          type="text"
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 pl-10 pr-4 text-white"
        />
      </div>
      
      <div className="divide-y divide-gray-800">
        {filteredTransactions.map((tx, index) => (
          <div key={index} className="transaction-card py-4 px-3 hover:bg-gray-800/50 rounded transition-colors">
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center">
                  <a 
                    href={`https://solscan.io/tx/${tx.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mono text-xs text-indigo-400 hover:text-indigo-300 flex items-center"
                  >
                    https://solscan.io/tx/{tx.hash}
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
                <div className="mt-2 flex items-center">
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                    <a 
                      href={`https://solscan.io/account/${tx.fromWallet}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mono text-xs text-gray-300 hover:text-indigo-300"
                    >
                      https://solscan.io/account/{tx.fromWallet}
                    </a>
                  </div>
                  
                  <ArrowRight className="mx-2 h-3 w-3 text-gray-500" />
                  
                  <div className="flex items-center">
                    <div className={`h-2 w-2 rounded-full mr-2 ${
                      tx.toWalletType === 'exchange' ? 'bg-red-500' : 'bg-blue-500'
                    }`}></div>
                    <a 
                      href={`https://solscan.io/account/${tx.toWallet}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mono text-xs text-gray-300 hover:text-indigo-300"
                    >
                      https://solscan.io/account/{tx.toWallet}
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm font-medium text-white">
                  {tx.amount} SOL
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {tx.time}
                </div>
              </div>
            </div>
            
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="bg-gray-800 text-xs px-2 py-1 rounded text-gray-300">
                {tx.type}
              </span>
              {tx.success ? (
                <span className="bg-green-900/30 text-xs px-2 py-1 rounded text-green-400">
                  Success
                </span>
              ) : (
                <span className="bg-red-900/30 text-xs px-2 py-1 rounded text-red-400">
                  Failed
                </span>
              )}
              {tx.isLaundering && (
                <span className="bg-amber-900/30 text-xs px-2 py-1 rounded text-amber-400">
                  Suspicious
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;