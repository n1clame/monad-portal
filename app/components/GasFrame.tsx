'use client';
import React from 'react';

export default function GasFrame() {
  return (
    <div id="gas" className="gas">
      <div className="signature">website made by syntemp</div>
      <div style={{ position:'relative', zIndex:1 }}>
        <h3 className="gas-title">Gas in fee</h3>
        <p className="gas-sub">
          Animated conic-border frame with floating signature. Place your gas fees widget or any content here.
        </p>
      </div>
    </div>
  );
}
