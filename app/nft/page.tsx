"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const collections = [
  { name: "Mondana Baddies Eye Chain", img: "/nft-1.png", url: "https://magiceden.io/collections/monad-testnet/0xd6421e9c72199e971e5a3cde09214054e1216cd2", floor: 35000, symbol: "mondana" },
  { name: "Skrumpets", img: "/nft-2.png", url: "https://magiceden.io/collections/monad-testnet/0xe8f0635591190fb626f9d13c49b60626561ed145", floor: 22400, symbol: "skrumpets" },
  { name: "Chogs Mystery Chest", img: "/nft-3.png", url: "https://magiceden.io/collections/monad-testnet/0xe6b5427b174344fd5cb1e3d5550306b0055473c6", floor: 20000, symbol: "chogs" },
  { name: "DN", img: "/nft-4.png", url: "https://magiceden.io/collections/monad-testnet/0x151cf400af08bca390b16582ed6c4f096e4f17eb", floor: 18000, symbol: "dn" },
  { name: "r3tards", img: "/nft-5.png", url: "https://magiceden.io/collections/monad-testnet/0xed52e0d80f4e7b295df5e622b55eff22d262f6ed", floor: 15000, symbol: "r3tards" }
];

export default function NFTPage(){
  const [floors, setFloors] = useState(Object.fromEntries(collections.map(c=>[c.symbol, c.floor])));
  useEffect(()=>{
    // Optional: auto-refresh via proxy if provided
    const proxy = (typeof window !== "undefined") ? (window as any).ME_PROXY || process.env.NEXT_PUBLIC_ME_PROXY : undefined;
    const run = async ()=>{
      if(!proxy) return;
      const updated:any = {...floors};
      for(const c of collections){
        try{
          const res = await fetch(`${proxy}/api/me/collections/stats?address=${encodeURIComponent(c.url)}`);
          if(res.ok){ const data = await res.json(); if(data?.floorPrice) updated[c.symbol]=Math.round(Number(data.floorPrice)); }
        }catch{}
      }
      setFloors(updated);
    };
    run(); const id=setInterval(run, 5*60*1000); return ()=>clearInterval(id);
  },[]);

  return (
    <div className="min-h-screen bg-violet-950 text-white">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-4xl font-serif font-bold">NFT Collections</h1>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {collections.map((c, i)=>(
            <Card key={i} className="group bg-white/5 border-white/10 overflow-hidden h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(167,139,250,0.45)] hover:bg-gradient-to-r hover:from-violet-700/20 hover:to-fuchsia-700/20">
              <div className="aspect-video overflow-hidden bg-black/20">
                <img src={c.img} alt={c.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <CardHeader className="pb-0"><CardTitle className="text-base font-mono">{c.name}</CardTitle></CardHeader>
              <CardContent className="pt-2 flex items-center gap-3">
                <span className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/10 font-sans transition-all duration-300 group-hover:bg-white/15 group-hover:border-white/20">
                  Floor: {(floors[c.symbol]||c.floor).toLocaleString()} MON
                </span>
                <Button variant="secondary" className="ml-auto rounded-2xl" onClick={()=>window.open(c.url,'_blank')}>
                  View on Magic Eden <ExternalLink className="ml-2 w-4 h-4"/>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
