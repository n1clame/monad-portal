"use client";

import React, { useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import HoverFaq from "@/app/components/HoverFaq";
import { GaugeCircle, Coins, Cpu, GitCompare, Menu, ExternalLink } from "lucide-react";

const LINKS = {
  discord: "https://discord.gg/monad",
  twitter: "https://x.com/monad",
  explorer: "https://testnet.monadexplorer.com/",
  docs: "https://docs.monad.xyz/",
  whitepaper: "https://docs.monad.xyz/",
  faucet: "https://faucet.monad.xyz/"
};

const MONAD_NET = {
  params: {
    chainId: "0x279F",
    chainName: "Monad Testnet",
    nativeCurrency: { name: "MON", symbol: "MON", decimals: 18 },
    rpcUrls: ["https://testnet-rpc.monad.xyz"],
    blockExplorerUrls: ["https://testnet.monadexplorer.com"]
  }
};

const dict = {
  en: {
    brand: "monad portals",
    nav: { home: "Home", why: "Why Monad", start: "Get Started", discord: "Discord", final: "Links", faq: "FAQ" },
    hero: { title: "Unlock Web3 on Monad — fast, simple, free", start: "Get started", addNet: "Add Monad Testnet", tps: "1000+ TPS", fees: "Low fees", evm: "EVM compatible", parallel: "Parallel execution" },
    links: { title: "Official Links" },
    langSwitch: "RU"
  },
  ru: {
    brand: "monad portals",
    nav: { home: "Главная", why: "Почему Monad", start: "Как начать", discord: "Discord", final: "Ссылки", faq: "FAQ" },
    hero: { title: "Открой Web3 на Monad — быстро, просто, бесплатно", start: "Начать", addNet: "Добавить тестнет Monad", tps: "1000+ TPS", fees: "Низкая комиссия", evm: "EVM-совместимость", parallel: "Параллельное исполнение" },
    links: { title: "Официальные ссылки" },
    langSwitch: "EN"
  }
};

const SectionWrap = ({ id, children, bg=false }: any) => (
  <section id={id} className={`relative w-full overflow-hidden ${bg?'bg-gradient-to-b from-violet-950 via-violet-900 to-violet-950':''}`}>
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">{children}</div>
  </section>
);

function Orb(){
  return (
    <div className="relative group aspect-video rounded-2xl border border-white/10 overflow-hidden">
      <img src="/pixel-king.png" alt="pixel king" className="absolute inset-0 w-full h-full object-contain p-10 transition-transform duration-500 group-hover:-scale-x-100" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_30%,rgba(217,70,239,0.15),transparent_40%),radial-gradient(circle_at_70%_70%,rgba(99,102,241,0.15),transparent_40%)]" />
    </div>
  );
}

function StickyHero({ t }: any){
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0,1], [0,-150]);
  const split = t.hero.title.split(" — ");
  const Chip = ({text}:{text:string}) => (
    <div className="rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm backdrop-blur transition-all duration-200 hover:shadow-[0_0_20px_rgba(167,139,250,0.35)] hover:scale-[1.02]">{text}</div>
  );
  return (
    <SectionWrap id="hero" bg>
      <div ref={ref} className="grid lg:grid-cols-2 gap-10 items-center">
        <motion.div style={{ y }}>
          <h1 className="text-5xl font-semibold tracking-tight font-serif group">
            <span className="inline-block transition-transform group-hover:-translate-x-1">{split[0]}</span>
            {" — "}
            <span className="inline-block transition-transform group-hover:translate-x-1">{split[1]||""}</span>
          </h1>
          {/* убран подзаголовок "Apple-style ..." */}
          <div className="pixel-cta-group mt-6 flex flex-wrap gap-3">
            <Button className="rounded-2xl" onClick={()=>document.getElementById("start")?.scrollIntoView({behavior:'smooth'})}>{t.hero.start}</Button>
            <Button variant="secondary" className="rounded-2xl" onClick={()=> (window as any).ethereum?.request?.({ method: 'wallet_addEthereumChain', params: [MONAD_NET.params] })}>{t.hero.addNet}</Button>
            <Button variant="secondary" className="rounded-2xl" onClick={()=>location.href='/discord'}><span className="grad-text">About Discord</span></Button>
          </div>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Chip text={t.hero.tps}/>
            <Chip text={t.hero.fees}/>
            <Chip text={t.hero.evm}/>
            <Chip text={t.hero.parallel}/>
          </div>
        </motion.div>
        <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.6}}>
          <Orb/>
        </motion.div>
      </div>
    </SectionWrap>
  );
}

function InfoCard({ icon:Icon, title, desc }: any){
  return (
    <Card className="bg-white/5 border-white/10 h-full transition-all duration-300 hover:bg-gradient-to-r hover:from-violet-700/25 hover:to-fuchsia-700/25 hover:shadow-[0_0_24px_rgba(167,139,250,0.45)] group">
      <CardContent className="p-5 h-full">
        <div className="grid grid-cols-[40px_1fr] items-center gap-3 h-full">
          <div className="p-2 rounded-xl bg-violet-500/15 flex items-center justify-center"><Icon className="w-5 h-5"/></div>
          <div><div className="font-mono origin-left transition-transform duration-200 group-hover:scale-[1.03]">{title}</div><div className="text-sm text-white/75 font-sans mt-0.5">{desc}</div></div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Page(){
  const [lang,setLang] = useState<"en"|"ru">("en");
  const t = useMemo(()=>dict[lang], [lang]);

  return (
    <div className="min-h-screen bg-violet-950 text-white selection:bg-violet-500/30">
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-violet-950/70 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2">
            <img src="/monad-logo.png" alt="Monad Portals" className="w-8 h-8 rounded-xl"/>
            <span className="font-semibold tracking-wide pixel">{t.brand}</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 pixel-nav">
            {[
              {id:'hero',label:t.nav.home,href:'#hero'},
              {id:'why',label:t.nav.why,href:'#why'},
              {id:'start',label:t.nav.start,href:'#start'},
              {id:'discord',label:t.nav.discord,href:'/discord'},
              {id:'faq',label:t.nav.faq,href:'#faq'},
              {id:'links',label:t.nav.final,href:'#links'}
            ].map(n=>(<a key={n.id} href={n.href} className="text-sm text-white/80 hover:text-white transition">{n.label}</a>))}
            <Button className="rounded-2xl" onClick={()=>setLang(lang==='en'?'ru':'en')}>{t.langSwitch}</Button>
          </nav>
          <div className="md:hidden flex items-center gap-2"><Button className="rounded-2xl px-3" onClick={()=>setLang(lang==='en'?'ru':'en')}>{t.langSwitch}</Button><button className="p-2"><Menu/></button></div>
        </div>
      </header>

      <StickyHero t={t}/>

      {/* GAS SECTION with shimmer + characters close */}
      <SectionWrap id="gas" bg>
        <div className="relative">
          <img src="/assets/characters/hamster.png"  className="pointer-events-none select-none absolute -top-6 -left-4 w-24 opacity-60 rotate-[-10deg]"  alt="hamster" />
          <img src="/assets/characters/vr.png"       className="pointer-events-none select-none absolute -top-8 right-10 w-28 opacity-55 rotate-[12deg]"   alt="vr" />
          <img src="/assets/characters/dog.png"      className="pointer-events-none select-none absolute top-24 -left-10 w-28 opacity-55 rotate-[8deg]"    alt="dog" />
          <img src="/assets/characters/smoke.png"    className="pointer-events-none select-none absolute top-28 right-0 w-24 opacity-55 rotate-[-6deg]"    alt="smoke" />

          <div className="relative max-w-2xl mx-auto">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-8 text-center">
              <div className="mb-2 text-xs sm:text-sm font-mono tracking-wider text-white/80 animate-float-soft glow-soft">website made by syntemp</div>
<div className="text-sm uppercase tracking-wider text-white/70 font-mono">Gas Fee in Monad</div>
              <div className="mt-2 text-4xl pixel gasShimmer animate-gas-wiggle inline-block px-3 py-1 rounded">
                0.00021 MON
              </div>
              <div className="pixel-chip-group mt-3 text-white/70 text-sm font-sans">Static demo value for testnet</div>
            </div>
          </div>
        </div>
      </SectionWrap>

      {/* WHY (without Compare networks) */}
      <SectionWrap id="why">
        <div className="pixel-text-base pixel-why max-w-4xl mx-auto"><h2 className="text-3xl font-bold font-serif group pixel pixel-purple pixel-animated">
          <span className="inline-block transition-transform group-hover:-translate-x-1">{t.nav.why.split(' ')[0]}</span>{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1">{t.nav.why.split(' ').slice(1).join(' ')}</span>
        </h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InfoCard icon={GaugeCircle} title="1000+ TPS" desc={lang==='en'?"High throughput for dApps and DeFi.":"Высокая производительность для dApp и DeFi."}/>
          <InfoCard icon={Coins} title={t.hero.fees} desc={lang==='en'?"Cost-efficient transactions.":"Выгодные транзакции."}/>
          <InfoCard icon={Cpu} title={t.hero.evm} desc={lang==='en'?"Easy migration of contracts & tools.":"Лёгкая миграция контрактов и тулов."}/>
          <InfoCard icon={GitCompare} title={t.hero.parallel} desc={lang==='en'?"Optimized processing for scale.":"Оптимизация под масштаб."}/>
        </div>
      </div></SectionWrap>

      {/* START raised title over oval */}
      <SectionWrap id="start">
        <div className="pixel-text-base pixel-start max-w-4xl mx-auto"><h2 className="text-3xl font-bold font-serif relative z-10 mb-4 pixel pixel-purple pixel-animated">{lang==='en'?"How to get started":"Как начать"}</h2>
        <div className="relative mt-8 md:mt-12">
          <div className="absolute -inset-6 md:-inset-8 rounded-[9999px] border-2 border-violet-300/40 pointer-events-none"></div>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              {t: lang==='en'?"Install wallet":"Установи кошелёк", d: "MetaMask / Rabby"},
              {t: lang==='en'?"Add Monad network":"Добавь сеть Monad", d: lang==='en'?"Use the button below":"Кнопка ниже"},
              {t: lang==='en'?"Get test tokens":"Получить токены", d: lang==='en'?"Claim from faucet":"Кран"},
              {t: lang==='en'?"Try dApps & read docs":"dApp + документация", d: lang==='en'?"Ask in Discord":"Задай вопрос в Discord", link: LINKS.discord}
            ].map((s,i)=>(
              <Card key={i} className="bg-white/5 border-white/10 transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_24px_rgba(167,139,250,0.35)]">
                <CardContent className="p-5">
                  <h3 className="font-semibold font-mono">{s.t}</h3>
                  <p className="text-sm text-white/75 mt-1 font-sans">{s.link ? <a className="underline decoration-violet-400 hover:text-white" href={s.link} target="_blank">{s.d}</a> : s.d}</p>
                  {i===1&&(<Button className="mt-4 w-full rounded-2xl" onClick={()=> (window as any).ethereum?.request?.({ method:'wallet_addEthereumChain', params: [{ chainId: "0x279F", chainName: "Monad Testnet", nativeCurrency: { name: "MON", symbol: "MON", decimals: 18 }, rpcUrls: ["https://testnet-rpc.monad.xyz"], blockExplorerUrls: ["https://testnet.monadexplorer.com"] }] })}>Add to MetaMask</Button>)}
                  {i===2&&(<Button variant="secondary" className="mt-4 w-full rounded-2xl" onClick={()=>window.open(LINKS.faucet,'_blank')}>Open Faucet</Button>)}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div></SectionWrap>

      {/* FAQ hover reveal */}
      <SectionWrap id="faq">
        <div className="pixel-text-base pixel-faq"><h2 className="text-3xl font-bold font-serif">FAQ</h2>
        <p className="text-white/70 mt-2">{lang==='en'?'Hover to reveal answers':'Наведи, чтобы увидеть ответ'}</p>
        <div className="mt-6">
          <HoverFaq items={[
            { q:"Is Monad EVM compatible?", a:"Yes — contracts & tooling can be ported with minimal changes." },
            { q:"How to join the testnet?", a:"Add the testnet, claim MON from faucet, try dApps, share feedback in Discord." },
            { q:"What are fees like?", a:"Low fees thanks to optimized execution & parallelism." },
            { q:"Where to track transactions?", a:"Use the Testnet Explorer linked in the footer." },
            { q:"Does Monad support parallel execution?", a:"Yes, it's a core part of performance strategy." },
            { q:"Is it EVM tooling friendly?", a:"MetaMask, Hardhat, Foundry — all good to go." },
            { q:"How to add testnet quickly?", a:"Use the 'Add Monad Testnet' button on the hero." },
            { q:"Where to ask for help?", a:"Join Discord — channels for devs and community." },
            { q:"Can I showcase NFTs?", a:"NFT page removed per request; focus on Discord & docs." },
            { q:"Where to read docs/whitepaper?", a:"docs.monad.xyz has both." }
          ]}/>
        </div>
      </div></SectionWrap>

      {/* Official Links with pixel wiggle title */}
      <SectionWrap id="links">
        <h2 className="text-2xl font-bold pixel pixel-wiggle mb-4 letters-split">Official Links</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {label:'Discord',url:LINKS.discord,grad:'from-indigo-400 to-violet-500'},
            {label:'Twitter / X',url:LINKS.twitter,grad:'from-cyan-400 to-sky-500'},
            {label:'Docs',url:LINKS.docs,grad:'from-emerald-400 to-teal-500'},
            {label:'Whitepaper',url:LINKS.whitepaper,grad:'from-fuchsia-400 to-pink-500'},
            {label:'Testnet Explorer',url:LINKS.explorer,grad:'from-amber-400 to-orange-500'},
            {label:'Faucet',url:LINKS.faucet,grad:'from-lime-400 to-emerald-500'}
          ].map((l,i)=>(
            <a key={i} href={l.url} target="_blank" rel="noreferrer" className="p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition flex items-center justify-between"> 
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${l.grad} font-semibold font-mono letters-split`}>{l.label}</span>
              <ExternalLink className="w-4 h-4"/>
            </a>
          ))}
        </div>
      </SectionWrap>

      <footer className="border-t border-white/10 py-8">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/70">
            <p className="font-sans">© {new Date().getFullYear()} monad portals</p>
            <div className="flex items-center gap-4">
              <a href={LINKS.docs} target="_blank" rel="noreferrer" className="hover:text-white">Docs</a>
              <a href={LINKS.twitter} target="_blank" rel="noreferrer" className="hover:text-white">Twitter</a>
              <a href={LINKS.discord} target="_blank" rel="noreferrer" className="hover:text-white">Discord</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
