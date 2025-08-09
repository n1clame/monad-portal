"use client";
import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/**
 * Minimalistic Monad fee calculator.
 * Assumptions: base fee per tx (testnet) ~ 0.0001 MON, per-op cost multipliers.
 * This is illustrative (not on-chain exact).
 */
export default function FeeCalculator(){
  const [txCount, setTxCount] = useState(1);
  const [opComplexity, setOpComplexity] = useState<"simple"|"medium"|"heavy">("simple");
  const [monPrice, setMonPrice] = useState<number>(0); // optional user-entered price in USD

  const basePerTx = 0.0001; // MON
  const multiplier = opComplexity === "simple" ? 1 : opComplexity === "medium" ? 1.8 : 3.2;
  const feeMon = useMemo(()=> +(txCount * basePerTx * multiplier).toFixed(6), [txCount, opComplexity]);
  const feeUsd = monPrice ? +(feeMon * monPrice).toFixed(4) : null;

  return (
    <div className="relative my-16">
      {/* chaotic background characters */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <CharCloud/>
      </div>

      <Card className="mx-auto max-w-2xl bg-white/5 border-white/10 backdrop-blur">
        <CardContent className="p-6">
          <h3 className="text-2xl font-serif font-bold mb-2">Monad Fee Calculator</h3>
          <p className="text-white/70 mb-6">Estimate testnet-like fees in MON (illustrative).</p>

          <div className="grid sm:grid-cols-3 gap-4 items-end">
            <div>
              <label className="text-xs uppercase tracking-wide text-white/60">Transactions</label>
              <Input type="number" min={1} value={txCount} onChange={e=>setTxCount(Math.max(1, Number(e.target.value||1)))} />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wide text-white/60">Complexity</label>
              <select className="w-full h-10 rounded-md bg-white/5 border border-white/10 px-3 text-sm"
                      value={opComplexity} onChange={e=>setOpComplexity(e.target.value as any)}>
                <option value="simple">Simple transfer</option>
                <option value="medium">Swap / NFT mint</option>
                <option value="heavy">Complex contract</option>
              </select>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wide text-white/60">MON price (USD, optional)</label>
              <Input type="number" placeholder="0" value={monPrice || ""} onChange={e=>setMonPrice(Number(e.target.value||0))} />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="text-lg font-mono">≈ <span className="font-semibold">{feeMon}</span> MON</div>
            <div className="text-white/60">| base {basePerTx} MON × {txCount} × {multiplier}</div>
            {feeUsd !== null && <div className="ml-auto text-lg font-mono">≈ ${feeUsd}</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CharCloud(){
  const chars = [
    {src:"/char-hamster.png", size:100, rot:-8, x:"10%", y:"-10%"},
    {src:"/char-vr.png", size:140, rot:6, x:"-5%", y:"20%"},
    {src:"/char-dog.png", size:100, rot:-15, x:"90%", y:"15%"},
    {src:"/char-smoker.png", size:130, rot:12, x:"80%", y:"-5%"},
    {src:"/hamster.png", size:90, rot:18, x:"50%", y:"85%"},
  ];
  return (
    <div className="absolute inset-0">
      {chars.map((c, i)=>(
        <img key={i} src={c.src} className="absolute opacity-25" style={{
          width:c.size, height:c.size, left:c.x, top:c.y, transform:`rotate(${c.rot}deg)`
        }}/>
      ))}
    </div>
  );
}
