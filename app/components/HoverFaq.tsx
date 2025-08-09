"use client";
import React from "react";
export default function HoverFaq({ items }:{ items:{q:string,a:string}[] }){
  return (
    <div className="flex flex-col gap-4">
      {items.map((it,idx)=>(
        <div key={idx} className="relative rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="p-4">
            <div className="font-mono text-sm">{it.q}</div>
            <div className="mt-2 text-white/90">{it.a}</div>
          </div>
          <div className="absolute inset-0 bg-black/60 opacity-100 hover:opacity-0 transition-opacity duration-300"></div>
        </div>
      ))}
    </div>
  );
}
