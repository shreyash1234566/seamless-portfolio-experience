import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { timelineItems } from '@/data/portfolio';

const TimelineItem = ({ item, index }: { item: typeof timelineItems[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isOdd = index % 2 === 0;

  return (
    <div ref={ref} className="w-[85vw] shrink-0 snap-center md:w-auto md:shrink md:grid gap-5 mb-0 md:mb-12 items-center grid-cols-1 md:grid-cols-[1fr_60px_1fr] flex flex-col">
      {isOdd ? (
        <>
          <div className="text-left md:text-right">
            <motion.div
              className="p-[18px_20px] hover:-translate-y-1.5 transition-all duration-300"
              style={{
                background: 'hsl(var(--bg-card))',
                border: '1.5px solid hsl(var(--ink-faint))',
                borderRadius: 'var(--r-sketchy)',
                boxShadow: '4px 4px 0 hsl(var(--shadow)/0.05)',
              }}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', color: 'hsl(var(--yellow))', fontWeight: 700, letterSpacing: '0.08em', marginBottom: 6 }}>{item.year}</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: 6 }}>{item.title}</h3>
              <p className="break-words" style={{ fontSize: '1.5rem', color: 'hsl(var(--ink-light))', lineHeight: 1.5 }}>{item.desc}</p>
            </motion.div>
          </div>
          <div className="hidden md:flex items-center justify-center">
            <motion.div
              className="w-4 h-4 rounded-full relative z-[2] transition-all duration-400"
              style={{ background: isInView ? 'hsl(var(--yellow))' : 'hsl(var(--bg))', border: '3px solid hsl(var(--ink))', boxShadow: isInView ? '0 0 10px hsla(40,100%,68%,0.6)' : 'none', transform: isInView ? 'scale(1.4)' : 'scale(1)' }}
            />
          </div>
          <div className="hidden md:block" />
        </>
      ) : (
        <>
          <div className="hidden md:block" />
          <div className="hidden md:flex items-center justify-center">
            <motion.div
              className="w-4 h-4 rounded-full relative z-[2]"
              style={{ background: isInView ? 'hsl(var(--yellow))' : 'hsl(var(--bg))', border: '3px solid hsl(var(--ink))', boxShadow: isInView ? '0 0 10px hsla(40,100%,68%,0.6)' : 'none', transform: isInView ? 'scale(1.4)' : 'scale(1)' }}
            />
          </div>
          <div>
            <motion.div
              className="p-[18px_20px] hover:-translate-y-1.5 transition-all duration-300"
              style={{
                background: 'hsl(var(--bg-card))',
                border: '1.5px solid hsl(var(--ink-faint))',
                borderRadius: 'var(--r-sketchy)',
                boxShadow: '4px 4px 0 hsl(var(--shadow)/0.05)',
              }}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', color: 'hsl(var(--yellow))', fontWeight: 700, letterSpacing: '0.08em', marginBottom: 6 }}>{item.year}</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: 6 }}>{item.title}</h3>
              <p className="break-words" style={{ fontSize: '1.5rem', color: 'hsl(var(--ink-light))', lineHeight: 1.5 }}>{item.desc}</p>
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
};

const TimelineSection = () => (
  <section id="experience" className="section">
    <p className="section-label">experience</p>
    <h2>Career & <span className="accent">achievements</span></h2>
    <div className="relative py-5 flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 md:block md:gap-0 md:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {/* Rail */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 hidden md:block"
        style={{ background: 'repeating-linear-gradient(to bottom, hsl(var(--ink)) 0, hsl(var(--ink)) 6px, transparent 6px, transparent 12px)' }} />
      {timelineItems.map((item, i) => (
        <TimelineItem key={`${item.year}-${item.title}`} item={item} index={i} />
      ))}
    </div>
  </section>
);

export default TimelineSection;
