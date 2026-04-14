import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skillGroups } from '@/data/portfolio';

const pinColors = [
  'radial-gradient(circle at 35% 35%, #ff8a8a, #cc3333)',
  'radial-gradient(circle at 35% 35%, #8af, #3366cc)',
  'radial-gradient(circle at 35% 35%, #8fb, #22aa55)',
  'radial-gradient(circle at 35% 35%, #ffd, #cca000)',
];

const rotations = ['-1deg', '1deg', '-0.5deg', '1.5deg'];

const SkillsSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="section" ref={ref}>
      <p className="section-label">capabilities</p>
      <h2>Tools I <span className="accent">reach for</span></h2>

      <div className="relative overflow-hidden rounded-xl p-10"
        style={{
          background: 'radial-gradient(circle at 20% 30%, rgba(180,140,90,0.12) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(150,110,70,0.08) 0%, transparent 50%), #d4b896',
          border: '3px solid #b89060',
          boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.12), 0 12px 30px rgba(0,0,0,0.1)',
          perspective: 1200,
        }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              className="relative pt-5 pb-4 px-[18px]"
              style={{
                background: 'hsl(var(--bg-card))',
                border: '1.5px solid hsl(var(--ink-faint))',
                borderRadius: 3,
                boxShadow: '3px 3px 8px rgba(0,0,0,0.15), 0 1px 0 rgba(255,255,255,0.8) inset',
                transform: `rotate(${rotations[i]})`,
                transformStyle: 'preserve-3d',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ rotate: 0, y: -5, boxShadow: '6px 6px 12px rgba(0,0,0,0.2)' }}
            >
              {/* Pin */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full z-10"
                style={{ background: pinColors[i], boxShadow: '0 2px 5px rgba(0,0,0,0.3), inset 0 -1px 2px rgba(0,0,0,0.2)' }} />

              <h3 className="pb-2 mb-3" style={{
                fontFamily: 'var(--font-mono)', fontSize: '1.5rem', letterSpacing: '0.1em',
                textTransform: 'uppercase', color: 'hsl(var(--ink-light))',
                borderBottom: '1px dashed hsl(var(--ink-faint))',
              }}>
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {group.tags.map(tag => (
                  <span key={tag} className="text-[1.8rem] px-2.5 py-0.5 transition-all duration-200"
                    style={{
                      fontFamily: 'var(--font-hand)', border: '1.5px solid hsl(var(--ink))',
                      borderRadius: 'var(--r-sketchy)', cursor: 'default',
                    }}
                    onMouseEnter={e => {
                      (e.target as HTMLElement).style.background = 'hsl(var(--yellow))';
                      (e.target as HTMLElement).style.transform = 'scale(1.1) rotate(-3deg)';
                    }}
                    onMouseLeave={e => {
                      (e.target as HTMLElement).style.background = 'transparent';
                      (e.target as HTMLElement).style.transform = '';
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
