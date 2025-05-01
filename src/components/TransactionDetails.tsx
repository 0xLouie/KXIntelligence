import React from 'react';
import { ExternalLink, CheckCircle } from 'lucide-react';

interface TransactionDetailsProps {
  details: {
    signature: string;
    blockTime: string;
    slot: number;
    fee: number;
    status: string;
  };
}

const TransactionDetails: React.FC<TransactionDetailsProps> = ({ details }) => {
  return (
    <div className="mb-6 fade-in">
      <div className="glassmorphism rounded-lg overflow-hidden">
        <div className="p-4 flex items-center justify-between border-b border-gray-800/50">
          <div className="flex items-center space-x-2">
            <h2 className="text-sm font-medium">Transaction Details</h2>
            <span className="bg-green-900/30 text-green-400 text-xs px-1.5 py-0.5 rounded flex items-center">
              <CheckCircle className="h-3 w-3 mr-1" />
              Success
            </span>
          </div>
          <a
            href={`https://solscan.io/tx/${details.signature}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 text-xs flex items-center"
          >
            View on Solscan
            <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </div>
        
        <div className="p-4 grid grid-cols-2 gap-4 text-xs">
          <div>
            <div className="text-gray-400 mb-1">Transaction URL</div>
            <a
              href={`https://solscan.io/tx/${details.signature}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mono text-indigo-400 hover:text-indigo-300 bg-gray-900/50 px-2 py-1.5 rounded block truncate"
            >
              https://solscan.io/tx/{details.signature}
            </a>
          </div>
          
          <div>
            <div className="text-gray-400 mb-1">Slot</div>
            <div className="mono text-white/90 bg-gray-900/50 px-2 py-1.5 rounded">
              {details.slot.toLocaleString()}
            </div>
          </div>
          
          <div>
            <div className="text-gray-400 mb-1">Block Time</div>
            <div className="mono text-white/90 bg-gray-900/50 px-2 py-1.5 rounded">
              {new Date(details.blockTime).toLocaleString()}
            </div>
          </div>
          
          <div>
            <div className="text-gray-400 mb-1">Transaction Fee</div>
            <div className="mono text-white/90 bg-gray-900/50 px-2 py-1.5 rounded">
              {details.fee} SOL
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;