import React from 'react';
import logo from '../logo.png';
import { Twitter } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-transparent relative">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center">
          <img src={logo} alt="KX Intelligence Logo" className="h-16 w-16" />
          <div className="ml-4 flex items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-indigo-300">KX Intelligence</h1>
              <p className="text-lg text-indigo-400 tracking-wide mt-1">Advanced Solana Analysis</p>
            </div>
            <a 
              href="https://x.com/kxintelligence" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="ml-4 text-gray-400 hover:text-white transition-colors"
            >
              <Twitter className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;