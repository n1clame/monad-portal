'use client';
import React, { useMemo } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

type Item = {
  src: string;
  x: number;
  y: number;
  size: number;
};

const IMGS = [
  '/characters/pepe-glasses.png',
  '/characters/hedgehog-cute.png',
  '/characters/catfish.png',
];

function DraggableImg({ src, x, y, size }: Item) {
  const controls = useAnimationControls();
  return (
    <motion.div
      className="drag-item"
      style={{ left: x, top: y, width: size, height: size }}
      drag
      dragElastic={0.2}
      dragMomentum={0.3}
      onDragEnd={() => controls.start({ x: 0, y: 0, transition: { type: 'spring', stiffness: 300, damping: 22 } })}
      animate={controls}
      whileTap={{ scale: 0.97 }}
    >
      <img src={src} alt="" draggable={false} />
    </motion.div>
  );
}

export default function SiteBackground() {
  // deterministic scatter so it "looks good"
  const items: Item[] = useMemo(() => {
    const positions = [
      { x: 40, y: 120, size: 110 },
      { x: 280, y: 60, size: 140 },
      { x: 620, y: 180, size: 120 },
      { x: 900, y: 100, size: 130 },
      { x: 120, y: 420, size: 140 },
      { x: 860, y: 460, size: 120 },
    ];
    return positions.map((p, i) => ({
      ...p,
      src: IMGS[i % IMGS.length],
    }));
  }, []);

  return (
    <div className="bg-field" aria-hidden="true">
      {items.map((it, idx) => (
        <DraggableImg key={idx} {...it} />
      ))}
    </div>
  );
}
