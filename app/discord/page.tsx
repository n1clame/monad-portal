"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Menu } from "lucide-react";


const NAV = [
  { id: "home", label: "Home", href: "/" },
  { id: "why", label: "Why Monad", href: "/#why" },
  { id: "start", label: "Get Started", href: "/#start" },
  { id: "discord", label: "Discord", href: "/discord" },
  { id: "faq", label: "FAQ", href: "/#faq" },
  { id: "links", label: "Links", href: "/#links" }
];

const ROLES = [
  { key: "Monatrist & Monvideo", color: "from-fuchsia-400 to-violet-500",
    en: "Given to people who create high-quality content loved by the community. Earn it by consistently posting quality images/memes that catch the team’s attention. No nominations needed.",
    ru: "Выдаётся тем, кто создаёт качественный контент, который нравится сообществу. Можно получить за постоянные качественные посты (изображения, мемы), на которые обратит внимание команда. Номинации не требуются." },
  { key: "Nads & LocalNads", color: "from-emerald-400 to-teal-500",
    en: "Both require nomination by existing Nads. Nads — contributions in English and to the project overall. LocalNads — grow your regional community with region-specific content.",
    ru: "Обе роли выдаются только по номинации действующих Nads. Nads — за вклад на английском и в проект в целом. LocalNads — за развитие региональной комьюнити и соответствующий контент." },
  { key: "Quant", color: "from-sky-400 to-indigo-500",
    en: "For Nads with deep expertise useful to the project and others. If you teach and clearly share knowledge — this is for you (e.g., strong technical videos, dev threads).",
    ru: "Для Nads с высокой экспертизой, полезной проекту и участникам. Если умеете обучать и делиться знаниями — эта роль для вас (напр., тех-видео, треды для девов)." },
  { key: "Running Hot", color: "from-amber-400 to-orange-500",
    en: "Transitional role between Nads and Nads OG. For the most active Nads who ship quality content, post on socials, support the community, and are widely recognized. Community-nominated (preferably by someone with a higher role).",
    ru: "Переходная роль между Nads и Nads OG. Для самых активных Nads, кто стабильно делает качественный контент, постит в соцсетях, помогает сообществу и узнаваем. Номинация сообществом (желательно участником с более высокой ролью)." },
  { key: "Nads OG", color: "from-rose-400 to-pink-500",
    en: "Do everything from Running Hot — but better, more persistently and continuously. Usually ~3–4 months of consistent quality work.",
    ru: "Делать всё как для Running Hot, но лучше, настойчивее и на постоянной основе. Обычно ~3–4 месяца стабильной качественной работы." },
  { key: "Mon", color: "from-purple-400 to-violet-500",
    en: "Significant contribution so the team knows you as a key player. Many Mon/Mon2 host unique offline/Discord events and competitions.",
    ru: "Значимый вклад, чтобы команда знала вас как ключевого участника. Многие Mon/Mon2 проводят офлайн и Discord-ивенты, конкурсы." },
  { key: "Mon2", color: "from-lime-400 to-emerald-500",
    en: "Next step after Mon if you keep delivering, improve further, and bring new ideas.",
    ru: "Следующая ступень после Mon, если вы продолжаете качественно работать, развиваетесь и привносите новые идеи." }
];

function OriginalDiscordPage(){
  const [lang, setLang] = useState<"en"|"ru">("en");

  return (
    <div className="min-h-screen bg-violet-950 text-white">

      {/* Header with back arrow and nav */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-violet-950/70 border-b border-white/10">
        <div className="max-w-6xl mx_auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="secondary" className="rounded-2xl px-3" onClick={()=>location.href='/' }>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <a href="/" className="flex items-center gap-2">
              <img src="/monad-logo.png" alt="Monad Portals" className="w-8 h-8 rounded-xl"/>
              <span className="font-semibold tracking-wide pixel">monad portals</span>
            </a>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {NAV.map(n => (<a key={n.id} href={n.href} className="text-sm text_white/80 hover:text-white transition">{n.label}</a>))}
            <Button className="rounded-2xl" onClick={()=>setLang(lang==='en'?'ru':'en')}>{lang==='en'?'RU':'EN'}</Button>
          </nav>
          <div className="md:hidden flex items-center gap-2">
            <Button className="rounded-2xl px-3" onClick={()=>setLang(lang==='en'?'ru':'en')}>{lang==='en'?'RU':'EN'}</Button>
            <button className="p-2"><Menu/></button>
          </div>
        </div>
      </header>

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-4xl font-serif font-bold">Discord Roles</h1>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ROLES.map((r, i) => (
            <Card key={i} className="bg-white/5 border-white/10 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(167,139,250,0.45)] hover:bg-gradient-to-r hover:from-violet-700/20 hover:to-fuchsia-700/20">
              <CardHeader className="pb-2">
                <div className={`pixel text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-r ${r.color} role-abyss`}>
                  {r.key}
                </div>
              </CardHeader>
              <CardContent className="text-sm text-white/80 font-sans">
                {lang==='en'?r.en:r.ru}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

const BG_IMG = "/assets/characters/purple-hedgehog.png";

type Pos = { top:number; left:number; size:number };
const gen = (n:number):Pos[] => Array.from({length:n},()=> ({
  top: Math.random()*80+5,
  left: Math.random()*80+5,
  size: Math.random()*120 + 80
}));

export default function DiscordPage() {
  const [pos] = useState<Pos[]>(() => gen(16));
  const refs = useRef<(HTMLDivElement|null)[]>([]);
  const origins = useRef<{x:number;y:number}[]>([]);
  const [drag, setDrag] = useState<number|null>(null);

  useEffect(()=>{
    origins.current = pos.map(p=>({x:p.left,y:p.top}));
  }, [pos]);

  const onDown = (i:number, e: React.PointerEvent) => {
    setDrag(i);
    refs.current[i]?.setPointerCapture(e.pointerId);
  };
  const onMove = (i:number, e: React.PointerEvent) => {
    if (drag!==i) return;
    const el = refs.current[i];
    if (!el) return;
    const parent = el.parentElement as HTMLElement | null;
    if (!parent) return;
    const r = parent.getBoundingClientRect();
    const nx = ((e.clientX - r.left)/r.width)*100;
    const ny = ((e.clientY - r.top)/r.height)*100;
    el.style.left = Math.max(0, Math.min(92, nx))+"%";
    el.style.top = Math.max(0, Math.min(92, ny))+"%";
  };
  const onUp = (i:number) => {
    const el = refs.current[i];
    if (el){
      el.style.transition = "all 600ms cubic-bezier(.2,.8,.2,1)";
      el.style.left = origins.current[i].x+"%";
      el.style.top = origins.current[i].y+"%";
      setTimeout(()=>{ if (el) el.style.transition=""; }, 700);
    }
    setDrag(null);
  };

  return (
    <div className="relative min-h-[100dvh]">
      {/* Background characters layer (behind content) */}
      <div className="pointer-events-auto absolute inset-0 overflow-hidden z-0">
        {pos.map((p,i)=>(
          <div
            key={i}
            className="absolute drop-shadow-[0_0_12px_rgba(139,92,246,0.45)]"
            style={{ top: `${p.top}%`, left: `${p.left}%` }}
            ref={el => refs.current[i]=el}
            onPointerDown={(e)=>onDown(i,e)}
            onPointerMove={(e)=>onMove(i,e)}
            onPointerUp={()=>onUp(i)}
          >
            <Image
              src={BG_IMG}
              alt="character"
              width={p.size}
              height={p.size}
              draggable={false}
              className="opacity-70 hover:opacity-100 transition-opacity"
              priority={i<4}
            />
          </div>
        ))}
      </div>

      {/* Original page content sits above */}
      <div className="relative z-10 pixel-text-base pixel-discord">
        <OriginalDiscordPage />
      </div>
    </div>
  );
}
