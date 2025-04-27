import React from 'react';
import logo from '../../logo.png';

interface LoadingOverlayProps {
  progress?: {
    walletsAnalyzed: number;
    totalTransactions: number;
    currentStep: string;
  };
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ progress }) => {
  return (
    <div className="fixed inset-0 bg-[#020610]/80 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="text-center">
        <div className="mb-4 relative">
          <img src={logo} alt="KX Intelligence Logo" className="h-24 w-24 animate-pulse" />
          <div className="absolute -inset-4">
            <div className="w-32 h-32 rounded-full border-t-2 border-b-2 border-indigo-500 animate-spin"></div>
          </div>
        </div>
        <h2 className="text-2xl font-medium text-white mb-2">Analyzing Transactions</h2>
        <p className="text-gray-400 max-w-md mb-6">
          {progress?.currentStep || 'Tracing transaction paths and identifying connected wallets...'}
        </p>
        
        <div className="mt-6 w-64 h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 rounded-full transition-all duration-500"
            style={{ 
              width: progress ? `${(progress.walletsAnalyzed / 9) * 100}%` : '33%'
            }}
          ></div>
        </div>
        
        <div className="mt-6 text-xs text-gray-500 flex justify-center space-x-6">
          <div>
            <span className="text-gray-400">Wallets analyzed:</span>{' '}
            {progress?.walletsAnalyzed || 0}
          </div>
          <div>
            <span className="text-gray-400">Transactions:</span>{' '}
            {progress?.totalTransactions || 0}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;