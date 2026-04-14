import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import AboutPortraitSVG from './AboutPortraitSVG';

const chapters = [
  {
    num: 'chapter 01',
    content: (
      <>
        <p className="about-p">I learned design by <strong>tracing album covers</strong>, then learned code by breaking tiny websites and fixing them at 2am.</p>
        <p className="about-p">It started in 2001 — everything hand-coded, no frameworks, no shortcuts. Just a text editor, a dial-up connection, and <strong>relentless curiosity</strong>.</p>
        <p className="about-p" style={{ fontSize: '1rem', opacity: 0.6, marginTop: 8 }}>— scroll to keep reading</p>
      </>
    ),
  },
  {
    num: 'chapter 02',
    content: (
      <>
        <p className="about-p">I spent years in <span className="relative" style={{ color: 'hsl(var(--ink-faint))' }}>
          corporate agencies
          <span className="absolute left-0 right-0 top-1/2 h-0.5" style={{ background: 'hsl(var(--ink))', transform: 'rotate(-2deg)' }} />
        </span> before realizing I wanted smaller teams and bolder ideas.</p>
        <p className="about-p">I like products that <strong>feel handmade</strong>, even when the engineering under them is precise and unforgiving.</p>
        <p className="about-p">The craft is in the gap between the <strong>wireframe</strong> and what users actually feel.</p>
      </>
    ),
  },
  {
    num: 'chapter 03',
    content: (
      <div className="flex flex-col gap-4 mt-2">
        {[
          { text: 'I sketch UI ideas before I open Figma.', bg: 'hsl(var(--yellow-dim))', border: 'hsla(40,100%,68%,0.5)', pin: 'hsla(40,100%,68%,0.9)', rot: '-1deg' },
          { text: 'I still collect paper notebooks.', bg: '#d4f5e2', border: 'rgba(107,203,119,0.4)', pin: 'rgba(107,203,119,0.8)', rot: '1.5deg' },
          { text: 'I obsess over timing curves.', bg: '#fde8f0', border: 'rgba(255,107,157,0.4)', pin: 'rgba(255,107,157,0.7)', rot: '-0.5deg' },
          { text: 'I name animation timelines like movie scenes.', bg: '#e8eafb', border: 'rgba(100,110,240,0.3)', pin: 'rgba(100,110,240,0.5)', rot: '2deg' },
        ].map((note, i) => (
          <motion.div
            key={i}
            className="relative max-w-[380px] pl-8 pr-4 py-3 text-[1.05rem] cursor-default"
            style={{
              background: note.bg,
              border: `1px solid ${note.border}`,
              borderRadius: '2px 8px 8px 2px',
              boxShadow: '3px 3px 8px hsl(var(--shadow)/0.08)',
              transform: `rotate(${note.rot})`,
            }}
            whileHover={{ rotate: 0, scale: 1.04, boxShadow: '8px 12px 20px hsl(var(--shadow)/0.12)' }}
          >
            <span className="absolute left-3 text-black/30 font-bold">-</span>
            <span className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-4 h-2.5 rounded-sm" style={{ background: note.pin, boxShadow: '0 1px 3px hsl(var(--shadow)/0.15)' }} />
            {note.text}
          </motion.div>
        ))}
      </div>
    ),
  },
];

const ChapterBlock = ({ chapter, index }: { chapter: typeof chapters[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: '-40% 0px -40% 0px' });

  return (
    <motion.div
      ref={ref}
      className="min-h-[95vh] flex flex-col justify-center py-10"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.15, y: 40 }}
      transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="flex items-center gap-2 mb-4" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'hsl(var(--ink-faint))' }}>
        <span style={{ color: 'hsl(var(--yellow))' }}>//</span>
        {chapter.num}
      </div>
      {chapter.content}
    </motion.div>
  );
};

const AboutSection = () => {
  const [activeChapter, setActiveChapter] = useState(0);
  const chaptersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = chaptersRef.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = parseInt(entry.target.getAttribute('data-idx') || '0');
          setActiveChapter(idx);
        }
      });
    }, { rootMargin: '-40% 0px -40% 0px' });

    el.querySelectorAll('[data-idx]').forEach(ch => obs.observe(ch));
    return () => obs.disconnect();
  }, []);

  const frameRotations = ['-1.5deg', '1deg', '-0.3deg'];

  return (
    <section id="about" className="section" style={{ maxWidth: 'none', paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 60px 48px' }}>
        <p className="section-label">origin story</p>
        <h2>Messy draft <span className="accent">included</span></h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[60px] items-start" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 60px' }}>
        {/* Left: scrollable chapters */}
        <div ref={chaptersRef} className="pb-24">
          {chapters.map((ch, i) => (
            <div key={i} data-idx={i}>
              <ChapterBlock chapter={ch} index={i} />
            </div>
          ))}
        </div>

        {/* Right: sticky portrait */}
        <div>
          <div className="sticky" style={{ top: 'calc(50vh - 250px)', maxWidth: 400, height: 500, margin: '40px auto 0' }}>
            <div
              className="w-full h-full relative overflow-hidden transition-transform duration-600"
              style={{
                background: 'hsl(var(--bg-card))',
                border: '2px solid hsl(var(--ink))',
                borderRadius: 'var(--r-sketchy3)',
                boxShadow: '10px 10px 0 hsl(var(--shadow)/0.07), 18px 18px 40px rgba(0,0,0,0.04)',
                transform: `rotate(${frameRotations[activeChapter] || '0deg'})`,
                transitionTimingFunction: 'cubic-bezier(0.34,1.56,0.64,1)',
              }}
            >
              {/* Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rotate-2 w-[72px] h-[18px] rounded-sm z-[5]"
                style={{ background: 'hsla(40,100%,68%,0.75)' }}>
                <div className="absolute inset-0" style={{ background: 'repeating-linear-gradient(90deg,transparent,transparent 4px,rgba(255,255,255,0.3) 4px,rgba(255,255,255,0.3) 5px)' }} />
              </div>
              <AboutPortraitSVG />
              {/* Corner fold */}
              <div className="absolute bottom-0 right-0 z-[4]"
                style={{ width: 0, height: 0, borderStyle: 'solid', borderWidth: '0 0 32px 32px', borderColor: 'transparent transparent hsl(var(--bg)) transparent', filter: 'drop-shadow(-2px -2px 3px rgba(0,0,0,0.08))' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
