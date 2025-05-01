import React, { useEffect, useRef, useState } from 'react';
import { ZoomIn, ZoomOut, Maximize, Download } from 'lucide-react';

interface TransactionFlowProps {
  data: any;
}

const TransactionFlow: React.FC<TransactionFlowProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(0.8); // Start with a slightly zoomed out view
  const [highlightedPath, setHighlightedPath] = useState<number | null>(null);
  
  // Generate a unique layout pattern based on the wallet address
  const getLayoutPattern = () => {
    const sourceAddress = data.wallets[0].address;
    const hash = sourceAddress.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    
    return {
      radius: 250, // Reduced base radius
      spread: 0.8 + (Math.abs(hash % 100) / 100),
      rotation: (hash % 360) * (Math.PI / 180),
      verticalShift: (hash % 200) - 100 // Reduced vertical shift range
    };
  };
  
  // Dynamic node positioning with improved spacing
  const getNodePositions = () => {
    const positions: Record<string, {x: number, y: number}> = {};
    const wallets = data.wallets;
    const pattern = getLayoutPattern();
    
    // Calculate viewport dimensions
    const width = 1200; // Reduced width
    const height = 800; // Reduced height
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Position source wallet
    positions[wallets[0].address] = {
      x: centerX,
      y: centerY
    };
    
    // Group wallets by type
    const exchangeWallets = wallets.filter(w => w.type === 'exchange');
    const personalWallets = wallets.filter(w => w.type === 'personal' && w !== wallets[0]);
    
    // Calculate transaction weights
    const transactionWeights = new Map();
    data.transactions.forEach(tx => {
      transactionWeights.set(tx.toWallet, (transactionWeights.get(tx.toWallet) || 0) + tx.amount);
    });
    
    // Position exchange wallets in top half
    exchangeWallets.forEach((wallet, i) => {
      const weight = transactionWeights.get(wallet.address) || 1;
      const normalizedWeight = Math.min(Math.max(weight / 100, 0.8), 1.5);
      const angle = (Math.PI * 0.8) * (i / Math.max(exchangeWallets.length - 1, 1)) + Math.PI * 0.1;
      const radius = pattern.radius * normalizedWeight * 1.5;
      
      positions[wallet.address] = {
        x: centerX + Math.cos(angle) * radius,
        y: centerY - Math.sin(angle) * radius - 50 // Slight upward shift
      };
    });
    
    // Position personal wallets in bottom half
    personalWallets.forEach((wallet, i) => {
      const weight = transactionWeights.get(wallet.address) || 1;
      const normalizedWeight = Math.min(Math.max(weight / 50, 0.8), 1.5);
      const angle = (Math.PI * 0.8) * (i / Math.max(personalWallets.length - 1, 1)) + Math.PI * 1.1;
      const radius = pattern.radius * normalizedWeight * 1.2;
      
      positions[wallet.address] = {
        x: centerX + Math.cos(angle) * radius,
        y: centerY - Math.sin(angle) * radius + 50 // Slight downward shift
      };
    });
    
    return positions;
  };
  
  const nodePositions = getNodePositions();
  
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2));
  };
  
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.4));
  };
  
  const handleReset = () => {
    setZoomLevel(0.8);
  };

  // Generate curved paths between nodes
  const generatePath = (source: {x: number, y: number}, target: {x: number, y: number}, index: number) => {
    const dx = target.x - source.x;
    const dy = target.y - source.y;
    const dr = Math.sqrt(dx * dx + dy * dy);
    
    // Add varied curvature based on distance and index
    const curvature = 0.2 + (index % 3) * 0.1;
    
    // Calculate control points for smoother curves
    const midX = (source.x + target.x) / 2;
    const midY = (source.y + target.y) / 2;
    const controlX = midX + dy * curvature;
    const controlY = midY - dx * curvature;
    
    return `M ${source.x} ${source.y} Q ${controlX} ${controlY} ${target.x} ${target.y}`;
  };

  return (
    <div className="relative h-[600px]"> {/* Fixed height container */}
      <div className="absolute top-2 right-2 flex space-x-2 z-10">
        <button 
          onClick={handleZoomIn}
          className="p-2 bg-gray-800/50 rounded hover:bg-gray-700/50 transition-colors"
        >
          <ZoomIn className="h-4 w-4 text-gray-300" />
        </button>
        <button 
          onClick={handleZoomOut}
          className="p-2 bg-gray-800/50 rounded hover:bg-gray-700/50 transition-colors"
        >
          <ZoomOut className="h-4 w-4 text-gray-300" />
        </button>
        <button 
          onClick={handleReset}
          className="p-2 bg-gray-800/50 rounded hover:bg-gray-700/50 transition-colors"
        >
          <Maximize className="h-4 w-4 text-gray-300" />
        </button>
        <button 
          className="p-2 bg-gray-800/50 rounded hover:bg-gray-700/50 transition-colors"
        >
          <Download className="h-4 w-4 text-gray-300" />
        </button>
      </div>
      
      <div className="w-full h-full overflow-hidden flex items-center justify-center bg-gray-900/20 rounded-lg">
        <div 
          style={{ 
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'center center',
            transition: 'transform 0.3s ease-out'
          }}
        >
          <svg 
            ref={svgRef} 
            width="1200" 
            height="800" 
            viewBox="0 0 1200 800" 
            className="mx-auto"
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
              </marker>
              <marker
                id="arrowhead-highlighted"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#f97316" />
              </marker>
            </defs>
            
            {/* Draw transaction paths */}
            {data.transactions.map((tx: any, i: number) => {
              const source = nodePositions[tx.fromWallet];
              const target = nodePositions[tx.toWallet];
              
              if (!source || !target) return null;
              
              const isHighlighted = highlightedPath === i;
              const path = generatePath(source, target, i);
              
              return (
                <g key={i} className="transaction-line-group">
                  <path
                    d={path}
                    fill="none"
                    className={isHighlighted ? "network-line-highlighted" : "network-line"}
                    markerEnd={isHighlighted ? "url(#arrowhead-highlighted)" : "url(#arrowhead)"}
                    onMouseEnter={() => setHighlightedPath(i)}
                    onMouseLeave={() => setHighlightedPath(null)}
                  />
                  
                  {isHighlighted && (
                    <path
                      d={path}
                      fill="none"
                      className="transaction-flow-line"
                    />
                  )}
                  
                  <text
                    x={(source.x + target.x) / 2}
                    y={(source.y + target.y) / 2 - 15}
                    textAnchor="middle"
                    className="text-sm fill-gray-400"
                    style={{ pointerEvents: 'none' }}
                  >
                    {tx.amount} SOL
                  </text>
                </g>
              );
            })}
            
            {/* Draw wallet nodes */}
            {data.wallets.map((wallet: any, i: number) => {
              const position = nodePositions[wallet.address];
              if (!position) return null;
              
              const isSource = i === 0;
              const isExchange = wallet.type === 'exchange';
              
              const nodeSize = isSource ? 40 : 
                             isExchange ? 35 :
                             30;
              
              const fillColor = isSource ? "#6366f1" :
                              isExchange ? "#dc2626" :
                              "rgba(17, 24, 39, 0.8)";
              
              const strokeColor = isSource ? "#818cf8" :
                                isExchange ? "#ef4444" :
                                "#6366f1";
              
              return (
                <g key={wallet.address} className="wallet-node-group">
                  <a 
                    href={`https://solscan.io/account/${wallet.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <circle
                      cx={position.x}
                      cy={position.y}
                      r={nodeSize}
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth="2"
                      className={isSource ? "pulse" : ""}
                    />
                    
                    <text
                      x={position.x}
                      y={position.y - 8}
                      textAnchor="middle"
                      className="text-sm fill-white font-medium"
                    >
                      {wallet.label || "Wallet"}
                    </text>
                    
                    <text
                      x={position.x}
                      y={position.y + 12}
                      textAnchor="middle"
                      className="text-xs fill-gray-300 mono"
                    >
                      {wallet.address.substring(0, 4)}...{wallet.address.substring(wallet.address.length - 4)}
                    </text>
                  </a>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TransactionFlow;