import React from 'react';
import { ArrowRight, AlertTriangle, Clock, DollarSign, ExternalLink } from 'lucide-react';

interface FundingAnalysisProps {
  sourceWalletFunding: Array<{
    fromAddress: string;
    amount: number;
    timestamp: string;
    type: string;
  }>;
  exchangeOutflows: Array<{
    exchange: string;
    transactions: Array<{
      toAddress: string;
      amount: number;
      timestamp: string;
      suspicious: boolean;
      pattern: string;
    }>;
  }>;
}

const FundingAnalysis: React.FC<FundingAnalysisProps> = ({ 
  sourceWalletFunding, 
  exchangeOutflows 
}) => {
  const totalSourceFunding = sourceWalletFunding.reduce(
    (sum, funding) => sum + funding.amount, 
    0
  );

  const totalSuspiciousOutflow = exchangeOutflows.reduce(
    (sum, exchange) => sum + exchange.transactions.reduce(
      (exchangeSum, tx) => exchangeSum + (tx.suspicious ? tx.amount : 0),
      0
    ),
    0
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Source of Funds */}
      <div className="glassmorphism rounded-lg p-4">
        <h3 className="text-sm font-medium mb-4 flex items-center">
          <DollarSign className="h-4 w-4 mr-2 text-indigo-400" />
          Source of Funds
        </h3>
        
        <div className="space-y-3">
          {sourceWalletFunding.map((funding, index) => (
            <div key={index} className="bg-gray-900/30 rounded-lg p-3">
              <div className="flex justify-between items-start mb-2">
                {funding.fromAddress.length > 20 ? (
                  <a 
                    href={`https://solscan.io/account/${funding.fromAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm mono text-gray-300 hover:text-indigo-300 flex items-center"
                  >
                    {funding.fromAddress.substring(0, 20)}...
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                ) : (
                  <span className="text-sm mono text-gray-300">
                    {funding.fromAddress}
                  </span>
                )}
                <span className="text-sm font-medium text-white">
                  {funding.amount} SOL
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">
                  {new Date(funding.timestamp).toLocaleDateString()}
                </span>
                <span className="bg-indigo-900/30 text-indigo-300 px-2 py-0.5 rounded">
                  {funding.type}
                </span>
              </div>
            </div>
          ))}
          
          <div className="border-t border-gray-800 mt-4 pt-4 flex justify-between">
            <span className="text-sm text-gray-400">Total Funding</span>
            <span className="text-sm font-medium text-white">
              {totalSourceFunding.toFixed(2)} SOL
            </span>
          </div>
        </div>
      </div>

      {/* Exchange Outflows */}
      <div className="glassmorphism rounded-lg p-4">
        <h3 className="text-sm font-medium mb-4 flex items-center">
          <AlertTriangle className="h-4 w-4 mr-2 text-amber-400" />
          Suspicious Exchange Outflows
        </h3>
        
        <div className="space-y-4">
          {exchangeOutflows.map((exchange, index) => (
            <div key={index}>
              <div className="text-sm text-gray-400 mb-2">{exchange.exchange}</div>
              
              <div className="space-y-3">
                {exchange.transactions.filter(tx => tx.suspicious).map((tx, txIndex) => (
                  <div key={txIndex} className="bg-gray-900/30 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <a 
                        href={`https://solscan.io/account/${tx.toAddress}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm mono text-gray-300 hover:text-indigo-300 flex items-center"
                      >
                        {tx.toAddress.substring(0, 20)}...
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                      <span className="text-sm font-medium text-white">
                        {tx.amount} SOL
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-400">
                        {new Date(tx.timestamp).toLocaleDateString()}
                      </span>
                      <span className="bg-red-900/30 text-red-300 px-2 py-0.5 rounded">
                        {tx.pattern}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <div className="border-t border-gray-800 mt-4 pt-4 flex justify-between">
            <span className="text-sm text-gray-400">Total Suspicious Outflow</span>
            <span className="text-sm font-medium text-white">
              {totalSuspiciousOutflow.toFixed(2)} SOL
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundingAnalysis