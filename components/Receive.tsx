'use client'

import { useState } from 'react'

interface RecipientData {
  firstname: string
  lastname: string
  mobilephone: string
  bankAccount: string
  accountNumber: string
}

const bankOptions = [
  { value: 'KTB', label: ' Krung Thai Bank Public Company Limited' },
  { value: 'KBANK', label: 'KASIKORNBANK Public Company Limited' },
  { value: 'BBL', label: 'Bangkok Bank Public Company Limited' },
    { value: 'SCB', label: 'Siam Commercial Bank Public Company Limited' },
      { value: 'GSB', label: 'GOVERNMENT SAVINGS BANK' },
        { value: 'UOB', label: 'nited Overseas Bank (Thai) Public Company Limited' },
         { value: 'KK', label: 'Kiatnakin Phatra Bank' }

]

export default function Receive() {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<RecipientData>({
    firstname: '',
    lastname: '',
    mobilephone: '',
    bankAccount: '',
    accountNumber: ''
  })

  const handleInputChange = (field: keyof RecipientData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const isFormComplete = () => {
    return Object.values(formData).every(value => value.trim() !== '')
  }

  const getDeliveryTime = () => {
    const now = new Date()
    const deliveryTime = new Date(now.getTime() + (12 * 60 * 60 * 1000)) // Add 12 hours
    
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Asia/Bangkok',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }
    
    return deliveryTime.toLocaleString('th-TH', options)
  }

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
        justifyContent: 'center',
        display: 'flex',
      }}
    >
    
      <div className="w-full max-w-md">
        {/* Glass Card */}
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Receive Money</h1>
            <p className="text-white/80">Add recipient details to receive funds</p>
          </div>

          {!showForm ? (
            /* Add Button */
            <div className="text-center">
              <button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                + Add Recipient
              </button>
            </div>
          ) : (
            /* Form */
            <div className="space-y-6">
              {/* First Name */}
              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">
                  First Name
                </label>
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
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Last Name
                </label>
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
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Mobile Phone
                </label>
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
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Bank Account
                </label>
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
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Bank Account Number
                </label>
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
                    💰 Money will be must take time to process and deposited in your account within 12 Hours
                  </p>
                  <p className="text-green-200 text-xs text-center mt-2">
                    Expected delivery: {getDeliveryTime()}
                  </p>
                </div>
              )}

              {/* Reset Button */}
              <button
                onClick={() => {
                  setShowForm(false)
                  setFormData({
                    firstname: '',
                    lastname: '',
                    mobilephone: '',
                    bankAccount: '',
                    accountNumber: ''
                  })
                }}
                className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 border border-white/20"
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}