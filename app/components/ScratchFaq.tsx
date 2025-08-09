"use client";
import React, { useEffect, useRef, useState } from "react";
export default function ScratchFaq({ items }:{ items:{q:string,a:string}[] }){
  return <div className="flex flex-col gap-4">{items.map((it,idx)=><ScratchItem key={idx} q={it.q} a={it.a}/>)}</div>;
}
function ScratchItem({ q, a }:{ q:string; a:string }){
  const ref=useRef<HTMLCanvasElement>(null); const [revealed,setRevealed]=useState(false);
  useEffect(()=>{
    const c=ref.current!; const ctx=c.getContext("2d")!;
    const resize=()=>{ c.width=c.offsetWidth; c.height=c.offsetHeight; paint(); };
    const paint=()=>{ const g=ctx.createLinearGradient(0,0,c.width,c.height); g.addColorStop(0,"rgba(139,92,246,0.98)"); g.addColorStop(1,"rgba(217,70,239,0.98)"); ctx.globalCompositeOperation="source-over"; ctx.fillStyle=g; ctx.fillRect(0,0,c.width,c.height); ctx.globalCompositeOperation="destination-out"; };
    resize(); const ro=new ResizeObserver(resize); ro.observe(c);
    let down=false; const scratch=(x:number,y:number)=>{ ctx.beginPath(); ctx.arc(x,y,18,0,Math.PI*2); ctx.fill(); check(); };
    const get=(e:any)=>{ const r=c.getBoundingClientRect(); const p=("touches"in e?e.touches[0]:e); return {x:p.clientX-r.left,y:p.clientY-r.top};};
    const d=(e:any)=>{down=true; const {x,y}=get(e); scratch(x,y)}; const m=(e:any)=>{if(!down)return; const {x,y}=get(e); scratch(x,y)}; const u=()=>{down=false};
    c.addEventListener("mousedown",d); c.addEventListener("mousemove",m); window.addEventListener("mouseup",u); c.addEventListener("touchstart",d,{passive:true}); c.addEventListener("touchmove",m,{passive:true}); window.addEventListener("touchend",u);
    function check(){ const d=ctx.getImageData(0,0,c.width,c.height).data; let t=0; for(let i=3;i<d.length;i+=4){ if(d[i]===0) t++; } if(t/(d.length/4)>0.6) setRevealed(true); }
    return ()=>{ ro.disconnect(); c.removeEventListener("mousedown",d); c.removeEventListener("mousemove",m); window.removeEventListener("mouseup",u); c.removeEventListener("touchstart",d); c.removeEventListener("touchmove",m); window.removeEventListener("touchend",u); };
  },[]);
  return (<div className="relative rounded-2xl border border-white/10 bg-white/5 overflow-hidden min-h-[120px]">
    <div className="p-4"><div className="font-mono text-sm opacity-90">{q}</div><div className="mt-2 text-white/90">{a}</div></div>
    {!revealed && <canvas ref={ref} className="absolute inset-0 cursor-pointer"></canvas>}
  </div>);
}