import React, { useState } from 'react';
import { ExternalLink, Copy, AlertTriangle, Check, Search } from 'lucide-react';

interface WalletListProps {
  wallets: any[];
}

const WalletList: React.FC<WalletListProps> = ({ wallets }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  
  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2000);
  };
  
  const filteredWallets = searchTerm 
    ? wallets.filter(wallet => 
        wallet.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (wallet.label && wallet.label.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : wallets;
  
  return (
    <div>
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
        <input
          type="text"
          placeholder="Search wallets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 pl-10 pr-4 text-white"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWallets.map((wallet, index) => (
          <div key={index} className="wallet-card rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                <div className={`h-3 w-3 rounded-full mr-2 ${
                  wallet.type === 'exchange' ? 'bg-red-500' : 
                  wallet.type === 'contract' ? 'bg-purple-500' : 
                  'bg-blue-500'
                }`}></div>
                <h3 className="font-medium text-white">{wallet.label || "Unknown Wallet"}</h3>
              </div>
              
              {wallet.riskScore > 80 && (
                <div className="bg-amber-900/40 p-1 rounded-md">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                </div>
              )}
            </div>
            
            <div className="flex items-center mb-3">
              <a 
                href={`https://solscan.io/account/${wallet.address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mono text-gray-400 text-sm truncate mr-2 hover:text-indigo-300"
              >
                {wallet.address}
              </a>
              <button 
                onClick={() => handleCopy(wallet.address)}
                className="p-1 hover:bg-gray-700 rounded-md transition-colors"
              >
                {copiedAddress === wallet.address ? 
                  <Check className="h-4 w-4 text-green-500" /> : 
                  <Copy className="h-4 w-4 text-gray-500" />
                }
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-3 text-xs text-gray-400">
              <div>
                <span className="block text-gray-500">Type</span>
                <span className="block text-white capitalize">{wallet.type}</span>
              </div>
              <div>
                <span className="block text-gray-500">Transactions</span>
                <span className="block text-white">{wallet.txCount}</span>
              </div>
              <div>
                <span className="block text-gray-500">First Seen</span>
                <span className="block text-white">{wallet.firstSeen}</span>
              </div>
              <div>
                <span className="block text-gray-500">Risk Score</span>
                <div className="flex items-center">
                  <div className="w-full bg-gray-700 rounded-full h-1.5 mr-1">
                    <div 
                      className={`h-1.5 rounded-full ${
                        wallet.riskScore > 80 ? 'bg-red-500' :
                        wallet.riskScore > 50 ? 'bg-amber-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${wallet.riskScore}%` }}
                    ></div>
                  </div>
                  <span className="text-white">{wallet.riskScore}</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-auto">
              <a 
                href={`https://solscan.io/account/${wallet.address}`} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center"
              >
                View on Solscan <ExternalLink className="h-3 w-3 ml-1" />
              </a>
              <button className="text-xs text-gray-400 hover:text-white">
                More details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WalletList