import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  delay: number;
}

interface ConfettiAnimationProps {
  isActive?: boolean;
  duration?: number;
  pieceCount?: number;
}

const generateConfettiPieces = (count: number): ConfettiPiece[] => {
  const colors = [
    "#FF5252",
    "#FF4081",
    "#E040FB",
    "#7C4DFF",
    "#536DFE",
    "#448AFF",
    "#40C4FF",
    "#18FFFF",
    "#64FFDA",
    "#69F0AE",
    "#B2FF59",
    "#EEFF41",
    "#FFFF00",
    "#FFD740",
    "#FFAB40",
    "#FF6E40",
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100, // random x position (percentage)
    y: -10 - Math.random() * 10, // start above the viewport
    size: 5 + Math.random() * 15, // random size between 5-20px
    color: colors[Math.floor(Math.random() * colors.length)],
    rotation: Math.random() * 360, // random initial rotation
    delay: Math.random() * 3, // random delay for animation start
  }));
};

const ConfettiAnimation: React.FC<ConfettiAnimationProps> = ({
  isActive = true,
  duration = 7,
  pieceCount = 150,
}) => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (isActive) {
      setConfetti(generateConfettiPieces(pieceCount));

      // Clear confetti after animation duration
      const timer = setTimeout(() => {
        setConfetti([]);
      }, duration * 1000);

      return () => clearTimeout(timer);
    } else {
      setConfetti([]);
    }
  }, [isActive, pieceCount, duration]);

  if (!isActive || confetti.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden bg-transparent">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute rounded-sm"
          style={{
            backgroundColor: piece.color,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            rotate: `${piece.rotation}deg`,
          }}
          initial={{ y: "-10%", x: `${piece.x}%`, rotate: piece.rotation }}
          animate={{
            y: "110%",
            x: `${piece.x + (Math.random() * 20 - 10)}%`,
            rotate: piece.rotation + Math.random() * 720 - 360,
          }}
          transition={{
            duration: duration * 0.8,
            delay: piece.delay,
            ease: [0.1, 0.4, 0.8, 1],
          }}
        />
      ))}

      {/* Balloon elements */}
      {Array.from({ length: 10 }).map((_, i) => {
        const size = 30 + Math.random() * 40;
        const color = [
          "#FF5252",
          "#FF4081",
          "#7C4DFF",
          "#448AFF",
          "#64FFDA",
          "#B2FF59",
          "#FFD740",
          "#FF6E40",
        ][Math.floor(Math.random() * 8)];
        const delay = Math.random() * 2;
        const duration = 5 + Math.random() * 5;
        const xPos = 10 + Math.random() * 80;

        return (
          <motion.div
            key={`balloon-${i}`}
            className="absolute rounded-full"
            style={{
              backgroundColor: color,
              width: `${size}px`,
              height: `${size * 1.2}px`,
              left: `${xPos}%`,
              bottom: "-10%",
              filter: "opacity(0.8)",
            }}
            initial={{ y: "100%" }}
            animate={{ y: "-120%" }}
            transition={{
              duration,
              delay,
              ease: "easeOut",
            }}
          >
            {/* Balloon string */}
            <div
              className="absolute w-0.5 bg-gray-300"
              style={{
                height: `${size * 0.8}px`,
                left: "50%",
                top: "100%",
                transform: "translateX(-50%)",
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default ConfettiAnimation;
