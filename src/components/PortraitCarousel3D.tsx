import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface CarouselCharacter {
  id: string;
  src: string;
  alt: string;
  name: string;
}

const characters: CarouselCharacter[] = [
  {
    id: 'char-1',
    src: '/portrait-1.png',
    alt: 'Mohamed Siddiq M. - Stride pose in striped black shirt and cargo trousers',
    name: 'Pose 1 - Stride',
  },
  {
    id: 'char-2',
    src: '/portrait-2.png',
    alt: 'Mohamed Siddiq M. - Standing casual pose in white t-shirt and tan trousers',
    name: 'Pose 2 - Casual',
  },
  {
    id: 'char-3',
    src: '/portrait-3.png',
    alt: 'Mohamed Siddiq M. - Leaning pose in striped linen shirt and black trousers',
    name: 'Pose 3 - Relaxed',
  },
];

export const PortraitCarousel3D: React.FC = () => {
  const [step, setStep] = useState(0);
  const [radius, setRadius] = useState(135);
  const shouldReduceMotion = useReducedMotion();

  // Responsive 3D cylinder radius adjustment for mobile, tablet, and desktop
  useEffect(() => {
    const updateRadius = () => {
      const width = window.innerWidth;
      if (width < 380) {
        setRadius(85);
      } else if (width < 640) {
        setRadius(105);
      } else if (width < 1024) {
        setRadius(135);
      } else {
        setRadius(160);
      }
    };

    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  // Precise timing: 3.5s stationary wait in front + 0.8s smooth transition = 4300ms cycle
  useEffect(() => {
    if (shouldReduceMotion) return;

    const timer = setInterval(() => {
      setStep((prev) => prev + 1);
    }, 4300);

    return () => clearInterval(timer);
  }, [shouldReduceMotion]);

  const imageClasses =
    'w-full h-auto max-h-[75vh] object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] pointer-events-none select-none';

  // Fallback for prefers-reduced-motion: clean single static character
  if (shouldReduceMotion) {
    return (
      <div className="relative w-full flex justify-center items-end select-none">
        <img
          src={characters[0].src}
          alt={characters[0].alt}
          className={imageClasses}
        />
      </div>
    );
  }

  // Active character index (0, 1, 2)
  const activeIndex = ((step % 3) + 3) % 3;

  return (
    <div
      className="relative w-full flex flex-col items-center justify-end select-none"
      style={{
        perspective: 1200,
      }}
    >
      {/* Invisible Sizing Reference Image (Maintains container aspect ratio & prevents layout shift) */}
      <img
        src={characters[0].src}
        alt="Mohamed Siddiq M. - Web & App Developer"
        className={`${imageClasses} opacity-0 pointer-events-none select-none`}
        aria-hidden="true"
      />

      {/* 3D Rotating Ring Cylinder */}
      <motion.div
        className="absolute inset-0 w-full h-full flex justify-center items-end"
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
        animate={{
          rotateY: -step * 120,
        }}
        transition={{
          duration: 0.8,
          ease: [0.4, 0.0, 0.2, 1], // Smooth standard ease-in-out
        }}
      >
        {characters.map((character, index) => {
          // Angle of this character around the 3D Y-axis: 0°, 120°, 240°
          const angle = index * 120;

          // Compute relative distance from front (0 = front, 1 or -1 = sides)
          let diff = (index - activeIndex) % 3;
          if (diff === 2) diff = -1;
          if (diff === -2) diff = 1;

          const isFront = diff === 0;

          return (
            <div
              key={character.id}
              className="absolute inset-0 w-full h-full flex justify-center items-end pointer-events-none"
              style={{
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'visible',
                zIndex: isFront ? 20 : 10,
              }}
            >
              <motion.div
                className="w-full h-full flex justify-center items-end"
                animate={{
                  opacity: isFront ? 1 : 0.55,
                  filter: isFront ? 'brightness(100%)' : 'brightness(65%)',
                  scale: isFront ? 1 : 0.92,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.4, 0.0, 0.2, 1],
                }}
                style={{
                  willChange: 'opacity, filter, transform',
                }}
              >
                <img
                  src={character.src}
                  alt={character.alt}
                  className={imageClasses}
                />
              </motion.div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};
