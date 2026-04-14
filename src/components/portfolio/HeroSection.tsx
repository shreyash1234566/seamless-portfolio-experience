import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PortraitSVG from './PortraitSVG';

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Parallax: portrait moves slower (0 → -80px while content scrolls away)
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen grid grid-cols-1 md:grid-cols-2 items-center gap-10 overflow-hidden"
      style={{ maxWidth: 1300, margin: '0 auto', padding: '100px 60px 60px' }}
    >
      {/* Left: text */}
      <motion.div className="relative z-[2]" style={{ y: contentY, opacity }}>
        <p className="flex items-center gap-2.5 mb-4"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'hsl(var(--ink-light))' }}>
          <span className="inline-block w-7 h-px" style={{ background: 'hsl(var(--ink-light))' }} />
          frontend developer & creative coder
        </p>

        <motion.h1
          className="mb-6"
          style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.6rem, 5.5vw, 4.8rem)', lineHeight: 1.1, letterSpacing: '-0.02em' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          I draw interfaces<br />that feel{' '}
          <em className="italic relative inline-block">
            alive
            <span
              className="absolute bottom-0 left-0 right-0 h-2 -z-10"
              style={{
                background: 'hsl(var(--yellow))',
                borderRadius: 2,
                transform: 'rotate(-1deg) scaleX(0)',
                transformOrigin: 'left',
                animation: 'highlight-draw 1s 0.8s forwards cubic-bezier(0.2,0.8,0.2,1)',
              }}
            />
          </em>
        </motion.h1>

        <motion.p
          className="mb-9"
          style={{ fontSize: '1.25rem', color: 'hsl(var(--ink-light))', maxWidth: 440 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Hi — this page is half <strong style={{ color: 'hsl(var(--ink))' }}>sketchbook</strong>, half experiment.
          I build playful, cinematic web experiences where the engineering is precise
          but the feeling is <strong style={{ color: 'hsl(var(--ink))' }}>handmade</strong>.
        </motion.p>

        <motion.div
          className="flex gap-3.5 items-center flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <a href="#contact" className="btn-sketch">Let's talk →</a>
          <a href="#projects" className="btn-sketch outline">See my work</a>
        </motion.div>
      </motion.div>

      {/* Right: GTA-style parallax portrait */}
      <motion.div
        className="relative z-[2] flex justify-center items-center"
        style={{ y: portraitY, perspective: 1000 }}
      >
        <motion.div
          className="relative"
          style={{ width: 340, height: 420, transformStyle: 'preserve-3d' }}
          whileHover={{ rotateX: -5, rotateY: 5, scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          {/* Tape */}
          <div className="absolute -top-[18px] left-1/2 -translate-x-1/2 -rotate-2 w-20 h-5 rounded-sm z-[3]"
            style={{ background: 'hsla(40,100%,68%,0.7)' }}>
            <div className="absolute inset-0" style={{
              background: 'repeating-linear-gradient(90deg,transparent,transparent 4px,rgba(255,255,255,0.3) 4px,rgba(255,255,255,0.3) 5px)'
            }} />
          </div>

          {/* Portrait card */}
          <div className="w-full h-full flex items-center justify-center overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #e8f4fd 0%, #d4e8c8 60%, #f5e6c8 100%)',
              borderRadius: 'var(--r-sketchy3)',
              border: '2px solid hsl(var(--ink))',
              boxShadow: '8px 8px 0 hsl(var(--shadow)/0.08), 16px 16px 30px rgba(0,0,0,0.05)',
            }}>
            <PortraitSVG />
          </div>

          {/* Floating doodles */}
          <svg className="absolute -top-5 -right-8 w-12 h-12 fill-none stroke-current opacity-40"
            style={{ animation: 'float 4s ease-in-out infinite', strokeWidth: 1.5, strokeLinecap: 'round', color: 'hsl(var(--ink-light))' }}
            viewBox="0 0 50 50">
            <path d="M25 5 L28 20 L42 20 L31 29 L35 44 L25 35 L15 44 L19 29 L8 20 L22 20Z"/>
          </svg>
          <svg className="absolute bottom-2.5 -left-10 w-[60px] h-10 fill-none stroke-current opacity-40"
            style={{ animation: 'float 5.2s ease-in-out infinite', animationDelay: '-1.3s', strokeWidth: 1.5, strokeLinecap: 'round', color: 'hsl(var(--ink-light))' }}
            viewBox="0 0 60 40">
            <path d="M5 20 C20 5 40 5 55 20"/>
            <path d="M49 13 L57 20 L49 27"/>
          </svg>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 flex flex-col items-center gap-1.5"
        style={{
          transform: 'translateX(-50%)',
          color: 'hsl(var(--ink-faint))',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.1em',
          animation: 'bounce 2.5s cubic-bezier(0.45,0,0.55,1) infinite',
        }}>
        <span>scroll</span>
        <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, transparent, hsl(var(--ink-faint)))' }} />
      </div>
    </section>
  );
};

export default HeroSection;
