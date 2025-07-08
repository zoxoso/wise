'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
}

const currencies: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: 'https://flagcdn.com/w20/us.png' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: 'https://flagcdn.com/w20/eu.png' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: 'https://flagcdn.com/w20/gb.png' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: 'https://flagcdn.com/w20/hk.png' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: 'https://flagcdn.com/w20/sg.png' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: 'https://flagcdn.com/w20/cn.png' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: 'https://flagcdn.com/w20/th.png' }
];

// Mock exchange rates (in real app, fetch from API)
const exchangeRates: { [key: string]: number } = {
  'USD': 1,
  'EUR': 0.85,
  'GBP': 0.73,
  'HKD': 7.8,
  'SGD': 1.35,
  'CNY': 7.2,
  'THB': 36.0
};

// Custom Dropdown Component
interface CustomDropdownProps {
  value: string;
  onChange: (value: string) => void;
  currencies: Currency[];
}

function CustomDropdown({ value, onChange, currencies }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCurrency = currencies.find(c => c.code === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="backdrop-blur-md bg-white/20 border border-white/30 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 min-w-[180px] flex items-center justify-between shadow-lg hover:bg-white/30 transition-all duration-300"
      >
        <div className="flex items-center">
          <img 
            src={selectedCurrency?.flag} 
            alt={selectedCurrency?.code} 
            className="w-6 h-4 mr-2 rounded shadow-sm" 
          />
          <span className="text-gray-700 font-medium">{selectedCurrency?.code} - {selectedCurrency?.symbol}</span>
        </div>
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-20 w-full mt-1 backdrop-blur-md bg-white/30 border border-white/30 rounded-xl shadow-2xl max-h-60 overflow-auto">
          {currencies.map((currency) => (
            <button
              key={currency.code}
              type="button"
              onClick={() => {
                onChange(currency.code);
                setIsOpen(false);
              }}
              className="w-full px-4 py-3 text-left hover:bg-white/40 flex items-center focus:outline-none focus:bg-white/40 transition-all duration-200"
            >
              <img 
                src={currency.flag} 
                alt={currency.code} 
                className="w-6 h-4 mr-3 rounded shadow-sm" 
              />
              <div>
                <span className="font-medium text-gray-700">{currency.code}</span>
                <span className="text-gray-600 ml-2">{currency.symbol}</span>
                <div className="text-sm text-gray-500">{currency.name}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Exchange() {
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('THB');
  const [fromAmount, setFromAmount] = useState<string>('');
  const [toAmount, setToAmount] = useState<string>('');
  const [lastChanged, setLastChanged] = useState<'from' | 'to'>('from');

  const convertCurrency = (amount: number, from: string, to: string): number => {
    const fromRate = exchangeRates[from];
    const toRate = exchangeRates[to];
    return (amount / fromRate) * toRate;
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    setLastChanged('from');
    
    if (value === '') {
      setToAmount('');
      return;
    }

    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      const converted = convertCurrency(numValue, fromCurrency, toCurrency);
      setToAmount(converted.toFixed(2));
    }
  };

  const handleToAmountChange = (value: string) => {
    setToAmount(value);
    setLastChanged('to');
    
    if (value === '') {
      setFromAmount('');
      return;
    }

    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      const converted = convertCurrency(numValue, toCurrency, fromCurrency);
      setFromAmount(converted.toFixed(2));
    }
  };

  const handleFromCurrencyChange = (currency: string) => {
    setFromCurrency(currency);
    if (fromAmount && lastChanged === 'from') {
      const numValue = parseFloat(fromAmount);
      if (!isNaN(numValue)) {
        const converted = convertCurrency(numValue, currency, toCurrency);
        setToAmount(converted.toFixed(2));
      }
    } else if (toAmount && lastChanged === 'to') {
      const numValue = parseFloat(toAmount);
      if (!isNaN(numValue)) {
        const converted = convertCurrency(numValue, toCurrency, currency);
        setFromAmount(converted.toFixed(2));
      }
    }
  };

  const handleToCurrencyChange = (currency: string) => {
    setToCurrency(currency);
    if (fromAmount && lastChanged === 'from') {
      const numValue = parseFloat(fromAmount);
      if (!isNaN(numValue)) {
        const converted = convertCurrency(numValue, fromCurrency, currency);
        setToAmount(converted.toFixed(2));
      }
    } else if (toAmount && lastChanged === 'to') {
      const numValue = parseFloat(toAmount);
      if (!isNaN(numValue)) {
        const converted = convertCurrency(numValue, currency, fromCurrency);
        setFromAmount(converted.toFixed(2));
      }
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const getExchangeRate = () => {
    if (fromAmount && !isNaN(parseFloat(fromAmount))) {
      const rate = convertCurrency(1, fromCurrency, toCurrency);
      return `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;
    }
    return '';
  };

  return (
    <div 
      style={{
        backgroundColor: '#070f2b',
        backgroundImage: `
          radial-gradient(at 41% 80%, #070f2b 0%, transparent 60%), 
          radial-gradient(at 42% 39%, #1b1a55 0%, transparent 50%), 
          radial-gradient(at 77% 15%, #535c91 0%, transparent 40%), 
          radial-gradient(at 45% 58%, #9290c3 0%, transparent 30%)
        `,
        minHeight: '100vh',
        padding: '1.5rem'
      }}
    >
      <div className="max-w-4xl mx-auto backdrop-blur-lg bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8">
        
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Currency Exchange</h2>
          <p className="text-white/80 text-lg"></p>
        </div>

        <div className="backdrop-blur-md bg-white/20 border border-white/30 p-8 rounded-2xl shadow-xl">
          {/* From Currency Section */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-white mb-3 drop-shadow">From</label>
            <div className="flex gap-4">
              <CustomDropdown
                value={fromCurrency}
                onChange={handleFromCurrencyChange}
                currencies={currencies}
              />
              <input
                type="number"
                value={fromAmount}
                onChange={(e) => handleFromAmountChange(e.target.value)}
                placeholder="Enter amount"
                className="flex-1 backdrop-blur-md bg-white/20 border border-white/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 text-white placeholder-white/60 font-medium shadow-lg"
              />
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={swapCurrencies}
              className="backdrop-blur-md bg-white/20 hover:bg-white/30 border border-white/30 text-white p-4 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110 transform"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>
          </div>

          {/* To Currency Section */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-white mb-3 drop-shadow">To</label>
            <div className="flex gap-4">
              <CustomDropdown
                value={toCurrency}
                onChange={handleToCurrencyChange}
                currencies={currencies}
              />
              <input
                type="number"
                value={toAmount}
                onChange={(e) => handleToAmountChange(e.target.value)}
                placeholder="Converted amount"
                className="flex-1 backdrop-blur-md bg-white/20 border border-white/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 text-white placeholder-white/60 font-medium shadow-lg"
              />
            </div>
          </div>

          {/* Exchange Rate Display */}
          {getExchangeRate() && (
            <div className="backdrop-blur-md bg-white/30 border border-white/40 p-4 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-white/90 font-medium">Exchange Rate:</span>
                <span className="text-white font-bold text-lg drop-shadow">{getExchangeRate()}</span>
              </div>
            </div>
          )}
        </div>

        {/* Currency Table */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">Current Exchange Rates</h3>
          <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="backdrop-blur-md bg-white/30 border-b border-white/30">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Currency</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Code</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Rate (vs USD)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/20">
                  {currencies.map((currency) => (
                    <tr key={currency.code} className="hover:bg-white/20 transition-all duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img src={currency.flag} alt={currency.code} className="w-8 h-6 mr-3 rounded shadow-md" />
                          <span className="text-white font-medium">{currency.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-white/90 font-medium">
                        {currency.code} ({currency.symbol})
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-white/90 font-mono">
                        {currency.code === 'USD' ? '1.0000' : exchangeRates[currency.code].toFixed(4)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Exchange;