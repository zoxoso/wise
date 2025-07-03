'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
}

interface RecipientData {
  firstname: string;
  lastname: string;
  mobilephone: string;
  bankAccount: string;
  accountNumber: string;
}

interface ExchangeData {
  fromCurrency: string;
  toCurrency: string;
  fromAmount: string;
  toAmount: string;
  exchangeRate: string;
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

const bankOptions = [
  { value: 'KTB', label: 'Krung Thai Bank Public Company Limited' },
  { value: 'KBANK', label: 'KASIKORNBANK Public Company Limited' },
  { value: 'BBL', label: 'Bangkok Bank Public Company Limited' },
  { value: 'SCB', label: 'Siam Commercial Bank Public Company Limited' },
  { value: 'GSB', label: 'GOVERNMENT SAVINGS BANK' },
  { value: 'UOB', label: 'United Overseas Bank (Thai) Public Company Limited' },
  { value: 'KK', label: 'Kiatnakin Phatra Bank' }
];

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

export default function Run() {
  const [currentStep, setCurrentStep] = useState<'exchange' | 'loading' | 'receive' | 'review' | 'success'>('exchange');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'process' | 'details'>('process');
  const [transactionId, setTransactionId] = useState('');
  
  // Exchange state
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('THB');
  const [fromAmount, setFromAmount] = useState<string>('');
  const [toAmount, setToAmount] = useState<string>('');
  const [lastChanged, setLastChanged] = useState<'from' | 'to'>('from');
  
  // Receive state
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<RecipientData>({
    firstname: '',
    lastname: '',
    mobilephone: '',
    bankAccount: '',
    accountNumber: ''
  });

  // Generate random transaction ID
  const generateTransactionId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 13; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  // Get current time in Thailand timezone
  const getCurrentTimeThailand = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Asia/Bangkok',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    return now.toLocaleString('th-TH', options);
  };

  // Exchange functions
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

  // Receive functions
  const handleInputChange = (field: keyof RecipientData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isFormComplete = () => {
    return Object.values(formData).every(value => value.trim() !== '');
  };

  const getDeliveryTime = () => {
    const now = new Date();
    const deliveryTime = new Date(now.getTime() + (12 * 60 * 60 * 1000));
    
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Asia/Bangkok',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };
    
    return deliveryTime.toLocaleString('th-TH', options);
  };

  // Step handlers
  const handleExchangeContinue = () => {
    if (!fromAmount || !toAmount) return;
    
    setIsLoading(true);
    setCurrentStep('loading');
    
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep('receive');
    }, 3000);
  };

  const handleReceiveContinue = () => {
    if (!isFormComplete()) return;
    
    setIsLoading(true);
    setCurrentStep('loading');
    
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep('review');
    }, 3000);
  };

  const handleConfirmTransaction = () => {
    setIsLoading(true);
    setCurrentStep('loading');
    
    setTimeout(() => {
      setTransactionId(generateTransactionId());
      setIsLoading(false);
      setCurrentStep('success');
    }, 5000);
  };

  const getCurrencySymbol = (code: string) => {
    return currencies.find(c => c.code === code)?.symbol || code;
  };

  const getBankName = (value: string) => {
    return bankOptions.find(b => b.value === value)?.label || value;
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
        padding: '1.5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div className="w-full max-w-4xl">
        
        {/* Loading State */}
        {currentStep === 'loading' && (
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
              <h2 className="text-2xl font-bold text-white">Processing...</h2>
              <p className="text-white/80">Please wait while we process your transaction</p>
            </div>
          </div>
        )}

        {/* Exchange Step */}
        {currentStep === 'exchange' && (
          <div className="backdrop-blur-lg bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Currency Exchange</h2>
              <p className="text-white/80 text-lg">Real-time currency conversion</p>
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
                <div className="backdrop-blur-md bg-white/30 border border-white/40 p-4 rounded-xl shadow-lg mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-white/90 font-medium">Exchange Rate:</span>
                    <span className="text-white font-bold text-lg drop-shadow">{getExchangeRate()}</span>
                  </div>
                </div>
              )}

              {/* Continue Button */}
              <button
                onClick={handleExchangeContinue}
                disabled={!fromAmount || !toAmount}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  fromAmount && toAmount
                    ? 'bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                    : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Receive Step */}
        {currentStep === 'receive' && (
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Receive Money</h1>
              <p className="text-white/80">Add recipient details to receive funds</p>
            </div>

            {!showForm ? (
              <div className="text-center">
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  + Add Recipient
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* First Name */}
                <div>
                  <label className="block text-white/90 text-sm font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    value={formData.firstname}
                    onChange={(e) => handleInputChange('firstname', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                    placeholder="Enter first name"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-white/90 text-sm font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastname}
                    onChange={(e) => handleInputChange('lastname', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                    placeholder="Enter last name"
                  />
                </div>

                {/* Mobile Phone */}
                <div>
                  <label className="block text-white/90 text-sm font-medium mb-2">Mobile Phone</label>
                  <input
                    type="tel"
                    value={formData.mobilephone}
                    onChange={(e) => handleInputChange('mobilephone', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                    placeholder="Enter mobile phone"
                  />
                </div>

                {/* Bank Account Dropdown */}
                <div>
                  <label className="block text-white/90 text-sm font-medium mb-2">Bank Account</label>
                  <select
                    value={formData.bankAccount}
                    onChange={(e) => handleInputChange('bankAccount', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                  >
                    <option value="" className="bg-gray-800 text-white">Select Bank</option>
                    {bankOptions.map((bank) => (
                      <option key={bank.value} value={bank.value} className="bg-gray-800 text-white">
                        {bank.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Bank Account Number */}
                <div>
                  <label className="block text-white/90 text-sm font-medium mb-2">Bank Account Number</label>
                  <input
                    type="text"
                    value={formData.accountNumber}
                    onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                    placeholder="Enter account number"
                  />
                </div>

                {/* Success Message */}
                {isFormComplete() && (
                  <div className="mt-6 p-4 bg-green-500/20 border border-green-400/30 rounded-xl backdrop-blur-sm">
                    <p className="text-green-100 text-sm text-center">
                      💰 Money will be deposited in your account within 12 Hours
                    </p>
                    <p className="text-green-200 text-xs text-center mt-2">
                      Expected delivery: {getDeliveryTime()}
                    </p>
                  </div>
                )}

                {/* Continue Button */}
                <button
                  onClick={handleReceiveContinue}
                  disabled={!isFormComplete()}
                  className={`w-full mt-4 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                    isFormComplete()
                      ? 'bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                      : 'bg-white/10 text-white/50 cursor-not-allowed'
                  } border border-white/20`}
                >
                  Continue
                </button>
              </div>
            )}
          </div>
        )}

        {/* Review Step */}
        {currentStep === 'review' && (
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Transaction Review</h1>
              <p className="text-white/80">Please review your transaction details</p>
            </div>

            <div className="space-y-6">
              {/* Exchange Details */}
              <div className="backdrop-blur-md bg-white/20 border border-white/30 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-white mb-4">💱 Exchange Details</h3>
                <div className="grid grid-cols-2 gap-4 text-white/90">
                  <div>
                    <span className="text-white/70">From:</span>
                    <div className="font-semibold">{getCurrencySymbol(fromCurrency)}{fromAmount} {fromCurrency}</div>
                  </div>
                  <div>
                    <span className="text-white/70">To:</span>
                    <div className="font-semibold">{getCurrencySymbol(toCurrency)}{toAmount} {toCurrency}</div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <span className="text-white/70">Exchange Rate:</span>
                  <div className="font-semibold text-white">{getExchangeRate()}</div>
                </div>
              </div>

              {/* Recipient Details */}
              <div className="backdrop-blur-md bg-white/20 border border-white/30 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-white mb-4">👤 Recipient Details</h3>
                <div className="space-y-3 text-white/90">
                  <div>
                    <span className="text-white/70">Name:</span>
                    <div className="font-semibold">{formData.firstname} {formData.lastname}</div>
                  </div>
                  <div>
                    <span className="text-white/70">Mobile:</span>
                    <div className="font-semibold">{formData.mobilephone}</div>
                  </div>
                  <div>
                    <span className="text-white/70">Bank:</span>
                    <div className="font-semibold">{getBankName(formData.bankAccount)}</div>
                  </div>
                  <div>
                    <span className="text-white/70">Account Number:</span>
                    <div className="font-semibold">{formData.accountNumber}</div>
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="backdrop-blur-md bg-green-500/20 border border-green-400/30 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-green-100 mb-4">🚀 Delivery Information</h3>
                <div className="text-green-100">
                  <div className="mb-2">Expected delivery within 12 hours</div>
                  <div className="text-sm text-green-200">Estimated arrival: {getDeliveryTime()}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentStep('exchange')}
                  className="flex-1 py-3 px-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all duration-300 border border-white/20"
                >
                  Back to Edit
                </button>
                <button
                  onClick={() => handleConfirmTransaction()}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Confirm Transaction
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Step */}
        {currentStep === 'success' && (
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl max-w-4xl mx-auto">
            {/* Transaction Amount Display */}
            <div className="text-center mb-8">
              <div className="backdrop-blur-md bg-gradient-to-r from-green-500/20 to-blue-600/20 border-2 border-green-400/30 rounded-2xl p-8 shadow-2xl">
                <div className="text-green-100 text-xl mb-2">✅ Transaction Successful!</div>
                <div className="text-6xl font-bold text-white mb-2">
                  {getCurrencySymbol(toCurrency)}{toAmount}
                </div>
                <div className="text-xl text-white/80">{toCurrency}</div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6">
              <div className="flex space-x-1 backdrop-blur-md bg-white/20 border border-white/30 rounded-xl p-1">
                <button
                  onClick={() => setActiveTab('process')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === 'process'
                      ? 'bg-white/30 text-white shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Process
                </button>
                <button
                  onClick={() => setActiveTab('details')}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === 'details'
                      ? 'bg-white/30 text-white shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Details
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="backdrop-blur-md bg-white/20 border border-white/30 p-6 rounded-xl min-h-[400px]">
              {activeTab === 'process' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white mb-6">Transaction Progress</h3>
                  
                  {/* Step 1 */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-semibold mb-1">Step 1: Transaction Generated</div>
                      <div className="text-white/70 text-sm">
                        Transaction will be generate by Jí Lóhng
                      </div>
                      <div className="text-green-300 text-xs mt-1">
                        {getCurrentTimeThailand()}
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-semibold mb-1">Step 2: Amount Approved</div>
                      <div className="text-white/70 text-sm">
                        {getCurrencySymbol(toCurrency)}{toAmount} {toCurrency} has approve by wise system and will be process to transfer
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-semibold mb-1">Step 3: Processing</div>
                      <div className="text-white/70 text-sm">
                        Deposited money in Receiver account
                      </div>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-white/20 border border-white/30 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white/40 rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <div className="text-white/60 font-semibold mb-1">Step 4: Complete</div>
                      <div className="text-white/50 text-sm">
                        Complete
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'details' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white mb-6">Transaction Details</h3>
                  
                  {/* Transaction ID */}
                  <div className="backdrop-blur-md bg-white/30 border border-white/40 p-4 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="text-white/90 font-medium">Transaction ID:</span>
                      <span className="text-white font-bold text-lg font-mono">{transactionId}</span>
                    </div>
                  </div>

                  {/* Exchange Details */}
                  <div className="backdrop-blur-md bg-white/30 border border-white/40 p-6 rounded-xl">
                    <h4 className="text-xl font-bold text-white mb-4">💱 Exchange Information</h4>
                    <div className="grid grid-cols-2 gap-4 text-white/90">
                      <div>
                        <span className="text-white/70">From:</span>
                        <div className="font-semibold">{getCurrencySymbol(fromCurrency)}{fromAmount} {fromCurrency}</div>
                      </div>
                      <div>
                        <span className="text-white/70">To:</span>
                        <div className="font-semibold">{getCurrencySymbol(toCurrency)}{toAmount} {toCurrency}</div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <span className="text-white/70">Exchange Rate:</span>
                      <div className="font-semibold text-white">{getExchangeRate()}</div>
                    </div>
                  </div>

                  {/* Recipient Details */}
                  <div className="backdrop-blur-md bg-white/30 border border-white/40 p-6 rounded-xl">
                    <h4 className="text-xl font-bold text-white mb-4">👤 Recipient Information</h4>
                    <div className="space-y-3 text-white/90">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-white/70">First Name:</span>
                          <div className="font-semibold">{formData.firstname}</div>
                        </div>
                        <div>
                          <span className="text-white/70">Last Name:</span>
                          <div className="font-semibold">{formData.lastname}</div>
                        </div>
                      </div>
                      <div>
                        <span className="text-white/70">Mobile Phone:</span>
                        <div className="font-semibold">{formData.mobilephone}</div>
                      </div>
                      <div>
                        <span className="text-white/70">Bank:</span>
                        <div className="font-semibold">{getBankName(formData.bankAccount)}</div>
                      </div>
                      <div>
                        <span className="text-white/70">Account Number:</span>
                        <div className="font-semibold font-mono">{formData.accountNumber}</div>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Information */}
                  <div className="backdrop-blur-md bg-green-500/20 border border-green-400/30 p-6 rounded-xl">
                    <h4 className="text-xl font-bold text-green-100 mb-4">🚀 Delivery Information</h4>
                    <div className="text-green-100 space-y-2">
                      <div>Expected delivery within 12 hours</div>
                      <div className="text-sm text-green-200">Estimated arrival: {getDeliveryTime()}</div>
                      <div className="text-sm text-green-200">Transaction time: {getCurrentTimeThailand()}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Button */}
            <div className="text-center mt-6">
              <button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Start New Transaction
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}