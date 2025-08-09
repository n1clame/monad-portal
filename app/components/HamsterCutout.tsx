"use client";
import React, { useEffect, useState } from "react";
export default function HamsterCutout({ src="/hamster.png", size=120 }:{src?:string; size?:number}){
  const [data,setData]=useState<string>("");
  useEffect(()=>{
    const img=new Image(); img.crossOrigin="anonymous"; img.src=src;
    img.onload=()=>{
      const c=document.createElement("canvas"); c.width=img.width; c.height=img.height;
      const ctx=c.getContext("2d")!; ctx.drawImage(img,0,0);
      const d=ctx.getImageData(0,0,c.width,c.height);
      // Assume pale background near top-left; remove with tolerance
      const i0=(5*c.width+5)*4; const r0=d.data[i0], g0=d.data[i0+1], b0=d.data[i0+2];
      const thr=90;
      for(let i=0;i<d.data.length;i+=4){ const r=d.data[i],g=d.data[i+1],b=d.data[i+2];
        const dist=Math.hypot(r-r0,g-g0,b-b0); if(dist<thr){ d.data[i+3]=0; } }
      ctx.putImageData(d,0,0); setData(c.toDataURL("image/png"));
    };
  },[src]);
  return <img src={data||src} alt="hamster" style={{width:size,height:size,objectFit:"contain"}}/>;
}