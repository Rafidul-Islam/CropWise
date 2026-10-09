// CropWise self-made logo — inline SVG, zero external requests (2G/offline safe).
// Sprout + water drop on deep-navy → teal gradient. By Arekta Team.
import React from 'react';

export const Logo: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    role="img"
    aria-label="CropWise logo"
    className="flex-shrink-0 rounded-xl shadow-xs"
  >
    <defs>
      <linearGradient id="cw-bg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#0B2C4A" />
        <stop offset="1" stopColor="#006A69" />
      </linearGradient>
    </defs>
    <rect x="1" y="1" width="46" height="46" rx="12" fill="url(#cw-bg)" />
    {/* sprout stem */}
    <path
      d="M24 37 V22"
      stroke="#98F2F0"
      strokeWidth="2.6"
      strokeLinecap="round"
    />
    {/* left leaf */}
    <path
      d="M24 26 C17 26 13.5 21.5 13 15.5 C19.5 16 23.5 20 24 26 Z"
      fill="#7CD5D3"
    />
    {/* right leaf */}
    <path
      d="M24 22 C31 22 34.5 17.5 35 11.5 C28.5 12 24.5 16 24 22 Z"
      fill="#F2A900"
    />
    {/* water drop */}
    <path
      d="M33.5 31.5 C33.5 29.6 35 27.8 35.5 26.5 C36 27.8 37.5 29.6 37.5 31.5 A2 2 0 0 1 33.5 31.5 Z"
      fill="#FFFFFF"
      opacity="0.95"
    />
  </svg>
);
