import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const items = [
  { year: '2020', title: 'Started Shipping Client Work', desc: 'Built landing pages, visual identity systems, and a lot of hand-crafted motion studies.' },
  { year: '2022', title: 'Moved Into Product Engineering', desc: 'Designed and shipped internal tooling with measurable UX and reliability improvements.' },
  { year: '2024', title: 'Creative Developer Focus', desc: 'Combined storytelling, code, and interaction design into portfolio-grade product experiences.' },
  { year: '2026', title: 'Sketchbook Web Experiments', desc: 'Exploring notebook-inspired interfaces that feel alive, tactile, and deeply human.' },
];

const TimelineItem = ({ item, index }: { item: typeof items[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isOdd = index % 2 === 0;

  return (
    <div ref={ref} className="grid gap-5 mb-12 items-center" style={{ gridTemplateColumns: '1fr 60px 1fr' }}>
      {isOdd ? (
        <>
          <div className="text-right">
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
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'hsl(var(--yellow))', fontWeight: 700, letterSpacing: '0.08em', marginBottom: 6 }}>{item.year}</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', marginBottom: 6 }}>{item.title}</h3>
              <p style={{ fontSize: '0.95rem', color: 'hsl(var(--ink-light))' }}>{item.desc}</p>
            </motion.div>
          </div>
          <div className="flex items-center justify-center">
            <motion.div
              className="w-4 h-4 rounded-full relative z-[2] transition-all duration-400"
              style={{ background: isInView ? 'hsl(var(--yellow))' : 'hsl(var(--bg))', border: '3px solid hsl(var(--ink))', boxShadow: isInView ? '0 0 10px hsla(40,100%,68%,0.6)' : 'none', transform: isInView ? 'scale(1.4)' : 'scale(1)' }}
            />
          </div>
          <div />
        </>
      ) : (
        <>
          <div />
          <div className="flex items-center justify-center">
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
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'hsl(var(--yellow))', fontWeight: 700, letterSpacing: '0.08em', marginBottom: 6 }}>{item.year}</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', marginBottom: 6 }}>{item.title}</h3>
              <p style={{ fontSize: '0.95rem', color: 'hsl(var(--ink-light))' }}>{item.desc}</p>
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
    <h2>Timeline: the <span className="accent">rough cuts</span></h2>
    <div className="relative py-5">
      {/* Rail */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
        style={{ background: 'repeating-linear-gradient(to bottom, hsl(var(--ink)) 0, hsl(var(--ink)) 6px, transparent 6px, transparent 12px)' }} />
      {items.map((item, i) => (
        <TimelineItem key={item.year} item={item} index={i} />
      ))}
    </div>
  </section>
);

export default TimelineSection;
