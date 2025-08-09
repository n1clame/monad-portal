"use client";

import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

export default function SiteBackground() {
  const controls = useAnimation();
  const [isDragging, setIsDragging] = useState(false);

  return (
    <motion.div
      className="fixed inset-0 z-[-1]"
      drag
      dragElastic={0.2}
      dragMomentum={true} // boolean
      dragTransition={{ power: 0.3 }} // настройка силы инерции
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => {
        setIsDragging(false);
        controls.start({
          x: 0,
          y: 0,
          transition: { type: "spring", stiffness: 300, damping: 22 },
        });
      }}
      animate={controls}
      whileTap={{ scale: 0.97 }}
    >
      {/* Тут твой фон или контент */}
    </motion.div>
  );
}
