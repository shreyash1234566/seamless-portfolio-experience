import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const testimonials = [
  { text: 'Avery turns rough ideas into memorable interfaces. The details always feel intentional, never decorative.', name: 'Priya R.', role: 'Product Designer' },
  { text: 'The final build looked exactly like the concept boards, but ran smoother than we expected.', name: 'Nate M.', role: 'Startup Founder' },
  { text: 'Best mix of creative direction and engineering rigor I have worked with on any project.', name: 'Lina K.', role: 'Engineering Manager' },
];

const TestimonialsSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="testimonials" className="section" ref={ref}>
      <p className="section-label">kind words</p>
      <h2>Notes from people I <span className="accent">built with</span></h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7" style={{ perspective: 1000 }}>
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            className="relative p-7 pb-5"
            style={{
              background: 'hsl(var(--bg-card))',
              border: '1.5px solid hsl(var(--ink-faint))',
              borderRadius: '4px 4px 4px 0',
              boxShadow: '6px 6px 0 hsl(var(--shadow)/0.06)',
              transformStyle: 'preserve-3d',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            whileHover={{ y: -5, boxShadow: '8px 8px 0 hsl(var(--shadow)/0.1)' }}
          >
            <span className="absolute -top-4 left-4 text-6xl leading-none"
              style={{ fontFamily: 'var(--font-serif)', color: 'hsl(var(--yellow))' }}>
              &ldquo;
            </span>
            <p className="text-[1.1rem] leading-relaxed mb-[18px]" style={{ color: 'hsl(var(--ink-light))' }}>{t.text}</p>
            <footer className="flex flex-col">
              <strong style={{ fontFamily: 'var(--font-hand)', fontSize: '1.1rem' }}>{t.name}</strong>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'hsl(var(--ink-faint))' }}>{t.role}</span>
            </footer>
            {/* Torn bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5"
              style={{
                background: 'hsl(var(--bg))',
                clipPath: 'polygon(0% 100%, 3% 0%, 7% 80%, 11% 10%, 15% 90%, 20% 5%, 24% 85%, 28% 15%, 33% 75%, 37% 5%, 41% 90%, 46% 10%, 50% 80%, 54% 5%, 58% 85%, 63% 20%, 67% 90%, 71% 0%, 75% 80%, 80% 15%, 84% 85%, 89% 0%, 93% 75%, 97% 10%, 100% 100%)',
              }} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
