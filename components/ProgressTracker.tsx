'use client'

import React, { useEffect, useState } from 'react';

interface ProgressTrackerProps {
  mtcn: string
}

const steps = [
  {
    label: 'Transactions has create',
    icon: (
      <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="12" r="12" fill="#D1FAE5"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 13l3 3 7-7" />
      </svg>
    ),
    done: true,
  },
  {
    label: 'Money has approve from system sender',
    icon: (
      <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="12" r="12" fill="#D1FAE5"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 13l3 3 7-7" />
      </svg>
    ),
    done: true,
  },
  {
    label: 'Deposited in desination account',
    icon: (
      <svg className="w-8 h-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="12" r="12" fill="#FEF3C7"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l2 2" />
        <circle cx="12" cy="16" r="1" fill="#FBBF24"/>
      </svg>
    ),
    done: false,
    waiting: true,
  },
  {
    label: 'complete',
    icon: (
      <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <circle cx="12" cy="12" r="12" fill="#E5E7EB"/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l2 2" />
      </svg>
    ),
    done: false,
  },
]

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ mtcn }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-2 text-gray-800 text-center">ติดตามสถานะ (MTCN)</h1>
      <h2 className="text-2xl font-semibold mb-8 text-yellow-600 text-center">{mtcn}</h2>
      <div className="w-full max-w-md flex flex-col gap-8">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <div>
              {step.icon}
            </div>
            <span className={`text-lg font-medium ${step.done ? 'text-green-600' : step.waiting ? 'text-yellow-600' : 'text-gray-400'}`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProgressTracker