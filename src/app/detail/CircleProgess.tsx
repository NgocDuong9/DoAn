// src/CircleProgress.js
import React from 'react'
import './CircleProgress.css'

export const getRatingProgess = (rating: number) => {
  return ((rating * (4 / 5)) / 5) * 100
}

const CircleProgress = ({ size, progress }: any) => {
  const radius = (size - 10) / 2 // Subtracting 10 to account for stroke width
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <svg width={size} height={size} className="circle-progress">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#23f9b2', stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: '#00aaff', stopOpacity: 1 }}
          />
        </linearGradient>
      </defs>
    
      <circle
        className="circle-progress-bar"
        stroke="#e6e6e6"
        strokeWidth="10"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - (80 / 100) * circumference}
        strokeLinecap="round"
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        className="circle-progress-bar"
        stroke="url(#gradient)"
        strokeWidth="10"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
    </svg>
  )
}

export default CircleProgress
