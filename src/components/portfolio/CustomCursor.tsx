import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 });
  const targetPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine)');
    if (!media.matches) return;
    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      targetPosRef.current = { x: e.clientX, y: e.clientY };
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest('a, button, input, textarea, [role="button"]');
      setIsInteractive(Boolean(interactive));
    };

    let rafId = 0;
    const animateRing = () => {
      setRingPos((prev) => ({
        x: prev.x + (targetPosRef.current.x - prev.x) * 0.18,
        y: prev.y + (targetPosRef.current.y - prev.y) * 0.18,
      }));
      rafId = window.requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    rafId = window.requestAnimationFrame(animateRing);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.body.style.cursor = 'none';
    const interactiveNodes = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    interactiveNodes.forEach((node) => {
      (node as HTMLElement).style.cursor = 'none';
    });

    return () => {
      document.body.style.cursor = 'auto';
      interactiveNodes.forEach((node) => {
        (node as HTMLElement).style.cursor = 'auto';
      });
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]">
      <motion.div
        className="absolute rounded-full"
        animate={{
          x: ringPos.x - 18,
          y: ringPos.y - 18,
          width: isInteractive ? 46 : 36,
          height: isInteractive ? 46 : 36,
          opacity: isInteractive ? 0.95 : 0.8,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 28, mass: 0.4 }}
        style={{
          border: '2px solid hsl(var(--yellow))',
          boxShadow: '0 0 18px hsla(var(--yellow) / 0.35)',
          backdropFilter: 'blur(1.5px)',
        }}
      />

      <motion.div
        className="absolute rounded-full"
        animate={{
          x: cursorPos.x - (isInteractive ? 6 : 5),
          y: cursorPos.y - (isInteractive ? 6 : 5),
          width: isInteractive ? 12 : 10,
          height: isInteractive ? 12 : 10,
        }}
        transition={{ type: 'spring', stiffness: 600, damping: 35, mass: 0.2 }}
        style={{
          background: 'hsl(var(--ink))',
          boxShadow: '0 0 12px hsla(var(--ink) / 0.35)',
        }}
      />
    </div>
  );
};
