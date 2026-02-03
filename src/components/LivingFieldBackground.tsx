import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Individual wheat stalk component
const WheatStalk = ({ x, height, delay }: { x: number; height: number; delay: number }) => {
  return (
    <motion.div
      className="absolute bottom-0"
      style={{ left: `${x}%` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay * 0.1, duration: 1 }}
    >
      {/* Stalk */}
      <motion.div
        className="origin-bottom"
        animate={{
          rotate: [0, 2, -2, 1, 0],
        }}
        transition={{
          duration: 4 + Math.random() * 2,
          repeat: Infinity,
          repeatType: "reverse",
          delay: delay * 0.3,
          ease: "easeInOut",
        }}
      >
        <div 
          className="w-[1px] bg-gradient-to-t from-primary/30 via-primary/20 to-transparent"
          style={{ height: `${height}px` }}
        />
        {/* Wheat head */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2">
          <div className="w-1 h-3 rounded-full bg-harvest-gold/40" />
        </div>
      </motion.div>
    </motion.div>
  );
};

// Data pulse nodes representing AI
const DataNode = ({ x, y, delay }: { x: number; y: number; delay: number }) => {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-tech-teal/40"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut",
      }}
    />
  );
};

// Connection line between nodes
const ConnectionLine = ({ x1, y1, x2, y2, delay }: { x1: number; y1: number; x2: number; y2: number; delay: number }) => {
  return (
    <motion.line
      x1={`${x1}%`}
      y1={`${y1}%`}
      x2={`${x2}%`}
      y2={`${y2}%`}
      stroke="hsl(170 55% 40% / 0.1)"
      strokeWidth="0.5"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: [0, 0.3, 0] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut",
      }}
    />
  );
};

export function LivingFieldBackground() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.04, 0.02]);
  const translateY = useTransform(scrollYProgress, [0, 1], [0, 30]);

  // Generate wheat stalks
  const wheatStalks = Array.from({ length: 30 }, (_, i) => ({
    x: (i / 30) * 100 + Math.random() * 3,
    height: 40 + Math.random() * 60,
    delay: i,
  }));

  // Generate data nodes
  const dataNodes = Array.from({ length: 15 }, (_, i) => ({
    x: 10 + Math.random() * 80,
    y: 20 + Math.random() * 60,
    delay: i * 0.5,
  }));

  // Generate connections between nearby nodes
  const connections = dataNodes.slice(0, 10).map((node, i) => {
    const nextNode = dataNodes[(i + 1) % dataNodes.length];
    return {
      x1: node.x,
      y1: node.y,
      x2: nextNode.x,
      y2: nextNode.y,
      delay: i * 0.3,
    };
  });

  return (
    <motion.div 
      className="living-field"
      style={{ opacity, y: translateY }}
    >
      {/* Wheat field layer */}
      <div className="absolute inset-x-0 bottom-0 h-32">
        {wheatStalks.map((stalk, i) => (
          <WheatStalk key={i} {...stalk} />
        ))}
      </div>

      {/* AI data network layer */}
      <svg className="absolute inset-0 w-full h-full">
        {connections.map((conn, i) => (
          <ConnectionLine key={i} {...conn} />
        ))}
      </svg>

      {dataNodes.map((node, i) => (
        <DataNode key={i} {...node} />
      ))}

      {/* Ambient particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-harvest-gold/20"
          style={{
            left: `${10 + Math.random() * 80}%`,
            bottom: '10%',
          }}
          animate={{
            y: [0, -100, -200],
            x: [0, Math.random() * 40 - 20, Math.random() * 60 - 30],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Light rays */}
      <div className="absolute top-0 right-1/4 w-32 h-64 opacity-20">
        <motion.div
          className="w-full h-full bg-gradient-to-b from-harvest-gold/10 via-harvest-gold/5 to-transparent"
          style={{ clipPath: 'polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)' }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  );
}
