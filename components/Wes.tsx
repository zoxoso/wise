'use client'

import React, { useState, useRef } from 'react'

function Wes() {
  const [mtcnValues, setMtcnValues] = useState<string[]>(Array(10).fill(''))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleInputChange = (index: number, value: string) => {
    // Allow only alphanumeric characters and limit to 1 character
    if (value.length > 1) return
    if (value && !/^[a-zA-Z0-9]$/.test(value)) return

    const newValues = [...mtcnValues]
    newValues[index] = value.toUpperCase()
    setMtcnValues(newValues)

    // Auto focus to next input
    if (value && index < 9) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace to go to previous input
    if (e.key === 'Backspace' && !mtcnValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const formatMTCN = () => {
    const values = mtcnValues.join('')
    if (values.length >= 3) {
      return `${values.slice(0, 3)}-${values.slice(3, 6)}-${values.slice(6, 10)}`
    }
    return values
  }

  const isComplete = mtcnValues.every(value => value !== '')

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-2xl">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          ติดตามการโอนเงิน
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-8 text-lg">
          หากต้องการติดตามการโอนเงิน ให้กรอกหมายเลขติดตาม (MTCN) 10 หลักด้านล่าง
        </p>

        {/* MTCN Input Fields */}
        <div className="mb-8">
          <div className="flex justify-center items-center gap-2 mb-4">
            {mtcnValues.map((value, index) => (
              <React.Fragment key={index}>
                <input
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  value={value}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none bg-white"
                  placeholder="X"
                  maxLength={1}
                />
                {(index === 2 || index === 5) && (
                  <span className="text-gray-400 text-xl font-bold">-</span>
                )}
              </React.Fragment>
            ))}
          </div>
          
          {/* Format Display */}
          <div className="text-gray-400 text-sm">
            รูปแบบ: XXX-XXX-XXXX
          </div>
        </div>

        {/* Track Button */}
        <button
          onClick={() => {
            if (isComplete) {
              alert(`ติดตาม MTCN: ${formatMTCN()}`)
            }
          }}
          disabled={!isComplete}
          className={`w-full max-w-md py-4 px-6 rounded-lg font-semibold text-lg mb-4 transition-all duration-300 ${
            isComplete
              ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-800 cursor-pointer'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          ติดตาม
        </button>

        {/* Alternative Track Button */}
        <button
          onClick={() => {
            alert('ติดตามโดยไม่ใช้ MTCN')
          }}
          className="w-full max-w-md py-4 px-6 rounded-lg font-semibold text-lg bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
        >
          ติดตามโดยไม่ใช้ MTCN
        </button>
      </div>
    </div>
  )
}

export default Wes
