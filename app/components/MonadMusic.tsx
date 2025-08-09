"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Play, Pause, Music2 } from "lucide-react";

export default function MonadMusic(){
  const audioRef = useRef<HTMLAudioElement|null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [vol, setVol] = useState(0.5);

  useEffect(()=>{
    const el = audioRef.current;
    if (!el) return;
    el.volume = vol;
    el.muted = muted;
  }, [vol, muted]);

  const togglePlay = async () => {
    const el = audioRef.current;
    if (!el) return;
    if (isPlaying){
      el.pause();
      setIsPlaying(false);
    } else {
      try{
        await el.play();
        setIsPlaying(true);
      }catch(e){
        console.error("Audio play error:", e);
      }
    }
  };

  const toggleMute = () => setMuted(m => !m);

  return (
    <div className="monad-music fixed bottom-4 right-4 z-[60]">
      <audio ref={audioRef} src="/assets/audio/monad-calm.mp3" loop preload="auto" />
      <div className="mm-card">
        <div className="mm-left">
          <div className="mm-icon"><Music2 className="w-5 h-5"/></div>
          <div className="mm-title">
            <span className="mm-brand">monad music</span>
            <span className="mm-sub">calm ambience — loop</span>
          </div>
        </div>
        <div className="mm-ctrls">
          <button className="mm-btn" onClick={togglePlay}>
            {isPlaying ? <Pause className="w-4 h-4"/> : <Play className="w-4 h-4"/>}
          </button>
          <button className="mm-btn" onClick={toggleMute}>
            {muted ? <VolumeX className="w-4 h-4"/> : <Volume2 className="w-4 h-4"/>}
          </button>
          <input
            className="mm-slider"
            type="range"
            min={0} max={1} step={0.01}
            value={muted ? 0 : vol}
            onChange={(e)=>{ const v = parseFloat(e.target.value); setVol(v); if (v===0) setMuted(true); else setMuted(false); }}
          />
        </div>
      </div>
    </div>
  );
}
