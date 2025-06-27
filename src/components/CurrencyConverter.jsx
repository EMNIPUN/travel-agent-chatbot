import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Calculator,
  CreditCard,
  Banknote,
  ArrowRightLeft
} from 'lucide-react';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(100);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('LKR');
  
  // Mock exchange rates (in real app, fetch from API)
  const exchangeRates = {
    USD: { LKR: 325.50, EUR: 0.92, GBP: 0.79 },
    EUR: { LKR: 354.20, USD: 1.09, GBP: 0.86 },
    GBP: { LKR: 412.30, USD: 1.27, EUR: 1.16 },
    LKR: { USD: 0.0031, EUR: 0.0028, GBP: 0.0024 }
  };

  const convertedAmount = exchangeRates[fromCurrency]?.[toCurrency] 
    ? (amount * exchangeRates[fromCurrency][toCurrency]).toFixed(2)
    : amount;

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
    { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺' },
    { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧' },
    { code: 'LKR', symbol: 'Rs', name: 'Sri Lankan Rupee', flag: '🇱🇰' }
  ];

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <motion.div 
      className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 text-white"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          Currency Exchange
        </h3>
        <div className="flex items-center gap-1 text-sm bg-white/20 px-2 py-1 rounded-full">
          <TrendingUp className="w-3 h-3" />
          Live Rates
        </div>
      </div>

      <div className="space-y-4">
        {/* Amount Input */}
        <div className="space-y-2">
          <label className="text-sm text-white/90">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            className="w-full bg-white/20 rounded-lg px-3 py-2 text-white placeholder-white/70 backdrop-blur-sm border-none outline-none"
            placeholder="Enter amount"
          />
        </div>

        {/* Currency Selection */}
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <label className="text-sm text-white/90 block mb-1">From</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full bg-white/20 rounded-lg px-3 py-2 text-white backdrop-blur-sm border-none outline-none"
            >
              {currencies.map(currency => (
                <option key={currency.code} value={currency.code} className="text-gray-800">
                  {currency.flag} {currency.code}
                </option>
              ))}
            </select>
          </div>

          <motion.button
            onClick={swapCurrencies}
            className="mt-6 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            whileHover={{ rotate: 180 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowRightLeft className="w-4 h-4" />
          </motion.button>

          <div className="flex-1">
            <label className="text-sm text-white/90 block mb-1">To</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full bg-white/20 rounded-lg px-3 py-2 text-white backdrop-blur-sm border-none outline-none"
            >
              {currencies.map(currency => (
                <option key={currency.code} value={currency.code} className="text-gray-800">
                  {currency.flag} {currency.code}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Result */}
        <motion.div 
          className="bg-white/20 rounded-lg p-3 backdrop-blur-sm"
          key={convertedAmount}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/90">Converted Amount</p>
              <p className="text-xl font-bold">
                {currencies.find(c => c.code === toCurrency)?.symbol} {convertedAmount}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/80">Exchange Rate</p>
              <p className="text-sm font-medium">
                1 {fromCurrency} = {exchangeRates[fromCurrency]?.[toCurrency]?.toFixed(4) || '1.0000'} {toCurrency}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quick Tips */}
        <div className="text-xs text-white/80 space-y-1">
          <p className="flex items-center gap-1">
            <CreditCard className="w-3 h-3" />
            Best rates at official exchange counters
          </p>
          <p className="flex items-center gap-1">
            <Banknote className="w-3 h-3" />
            ATMs widely available in cities
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CurrencyConverter;
