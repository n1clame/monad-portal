'use client';
import React, { useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

type CharProps = {
  label: string;
  className?: string;
  initial: { x: number; y: number };
};

function Draggable({ label, className, initial }: CharProps) {
  const controls = useAnimationControls();

  return (
    <motion.div
      className={`character ${className || ''}`}
      drag
      dragElastic={0.2}
      dragMomentum={true}
      dragTransition={{ power: 0.3, timeConstant: 200 }}
      initial={initial}
      animate={controls}
      onDragEnd={() => controls.start({ x: initial.x, y: initial.y, transition: { type: 'spring', stiffness: 300, damping: 20 } })}
      whileTap={{ scale: 0.96 }}
    >
      {label}
    </motion.div>
  );
}

export default function DraggableCharacters() {
  const frameRef = useRef<HTMLDivElement>(null);
  return (
    <div className="hero" ref={frameRef}>
      <div style={{ position:'relative', zIndex:2 }}>
        <div className="badge">Interactive</div>
        <h2 style={{ margin:'10px 0 8px 0' }}>Play with the characters</h2>
        <p style={{ color:'var(--muted)', maxWidth:560 }}>Drag the cards — they’ll spring back to their spots. Built with framer-motion.</p>
      </div>

      <div className="canvas">
        <Draggable label="A" initial={{ x: 40, y: 200 }} />
        <Draggable label="B" className="character--2" initial={{ x: 220, y: 80 }} />
        <Draggable label="C" className="character--3" initial={{ x: 420, y: 180 }} />
      </div>
    </div>
  );
}
