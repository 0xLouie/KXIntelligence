import React, { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Dashboard from './components/Dashboard';
import LoadingOverlay from './components/UI/LoadingOverlay';
import TransactionDetails from './components/TransactionDetails';
import { mockAnalysisData } from './utils/mockData';
import './App.css';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [analysisData, setAnalysisData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [transactionDetails, setTransactionDetails] = useState<any | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState<{
    walletsAnalyzed: number;
    totalTransactions: number;
    currentStep: string;
  }>({
    walletsAnalyzed: 0,
    totalTransactions: 0,
    currentStep: ''
  });

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setError('Please enter a valid Solana address or transaction ID');
      return;
    }
    
    setError(null);
    setIsLoading(true);
    setAnalysisData(null);
    setTransactionDetails(null);
    
    // Check if it's a Solscan transaction ID
    const isSolscanTx = query.includes('solscan.io/tx/') || query.length === 88;
    
    if (isSolscanTx) {
      const txId = query.includes('solscan.io/tx/') 
        ? query.split('solscan.io/tx/')[1]
        : query;
        
      // Simulate fetching transaction details
      await new Promise(resolve => setTimeout(resolve, 2000));
      setTransactionDetails({
        signature: txId,
        blockTime: new Date().toISOString(),
        slot: Math.floor(Math.random() * 200000000),
        fee: 0.000005,
        status: 'Success'
      });
    }
    
    // Simulate progressive analysis
    const totalSteps = 6;
    const stepDuration = 1000;
    const steps = [
      'Initializing analysis...',
      'Fetching transaction history...',
      'Identifying connected wallets...',
      'Analyzing transaction patterns...',
      'Calculating risk scores...',
      'Generating network map...'
    ];
    
    const mockWallets = mockAnalysisData.wallets;
    const walletsPerStep = Math.ceil(mockWallets.length / totalSteps);
    
    for (let i = 0; i < totalSteps; i++) {
      await new Promise(resolve => setTimeout(resolve, stepDuration));
      setAnalysisProgress({
        walletsAnalyzed: Math.min((i + 1) * walletsPerStep, mockWallets.length),
        totalTransactions: Math.floor(Math.random() * 50) + (i * 30),
        currentStep: steps[i]
      });
    }
    
    // Final delay before showing results
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    setAnalysisData({
      ...mockAnalysisData,
      wallets: mockWallets.map(wallet => ({
        ...wallet,
        txCount: Math.floor(Math.random() * 100) + 10,
        riskScore: Math.floor(Math.random() * 100),
        balance: parseFloat((Math.random() * 1000).toFixed(2))
      }))
    });
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020610] to-[#0a0f1f] text-gray-200 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        <SearchBar onSearch={handleSearch} error={error} />
        
        {isLoading && <LoadingOverlay progress={analysisProgress} />}
        
        {!isLoading && transactionDetails && (
          <TransactionDetails details={transactionDetails} />
        )}
        
        {!isLoading && analysisData && (
          <Dashboard 
            searchQuery={searchQuery} 
            analysisData={analysisData} 
          />
        )}
        
        {!isLoading && !analysisData && !error && (
          <div className="flex flex-col items-center justify-center mt-20 text-center">
            <div className="max-w-md glassmorphism p-8 rounded-2xl">
              <h2 className="text-2xl font-medium mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-indigo-200">Welcome to KX Intelligence</h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Enter a Solana wallet address or Solscan transaction ID to analyze transaction flows and identify connected wallets.
              </p>
            </div>
          </div>
        )}
      </main>
      
      {isLoading && <LoadingOverlay progress={analysisProgress} />}
    </div>
  );
};

export default App;