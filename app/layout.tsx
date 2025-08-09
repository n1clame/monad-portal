import "../styles/globals.css";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = { title: "monad portals", description: "Unlock Web3 on Monad" };

import MonadMusic from "./components/MonadMusic";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Press+Start+2P&display=swap" rel="stylesheet"/>
      </head>
      <body><div className="relative z-10">
      <div className="bg-chars-container">
        <img src="/assets/characters/char1.png" className="bg-char" style={{top:"10%",left:"5%",width:"120px"}} />
        <img src="/assets/characters/char2.png" className="bg-char" style={{top:"70%",left:"15%",width:"140px"}} />
        <img src="/assets/characters/char3.png" className="bg-char" style={{top:"30%",left:"80%",width:"160px"}} />
        <img src="/assets/characters/char4.png" className="bg-char" style={{top:"85%",left:"75%",width:"130px"}} />
      </div>
    {children}</div>  <div className="neon-js fixed inset-[-50%] -z-10 pointer-events-none" />
  <MonadMusic />
</body>
    </html>
  );
}
