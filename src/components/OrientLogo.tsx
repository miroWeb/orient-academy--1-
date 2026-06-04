/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface OrientLogoProps {
  className?: string;
  size?: number;
}

export default function OrientLogo({ className = '', size = 32 }: OrientLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className}`}
      id="orient-logo-svg"
    >
      {/* 3 stylized yellow stroke lines matching the official Orient Academy logo */}
      <path
        d="M 26 44 L 43 34 C 45 33, 47 33, 49 33.5 L 72 39"
        stroke="#f7e02b"
        strokeWidth="10.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 35 52 L 44 46 C 46 45, 48 45, 49 45.2 L 62 48"
        stroke="#f7e02b"
        strokeWidth="10.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 27 61 L 43 62 C 45 62, 47 61, 49 59.5 L 53 56"
        stroke="#f7e02b"
        strokeWidth="10.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
