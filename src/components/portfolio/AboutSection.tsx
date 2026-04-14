import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import AboutPortraitSVG from './AboutPortraitSVG';
import { aboutChapters, aboutNotes } from '@/data/portfolio';

const chapters = [
  {
    num: aboutChapters[0].num,
    content: (
      <>
        {aboutChapters[0].paragraphs.map((paragraph) => (
          <p key={paragraph} className="about-p">{paragraph}</p>
        ))}
      </>
    ),
  },
  {
    num: aboutChapters[1].num,
    content: (
      <>
        {aboutChapters[1].paragraphs.map((paragraph) => (
          <p key={paragraph} className="about-p">{paragraph}</p>
        ))}
      </>
    ),
  },
  {
    num: 'chapter 03',
    content: (
      <div className="flex flex-col gap-4 mt-2">
        {aboutNotes.map((note, i) => (
          <motion.div
            key={note.text}
            className="relative max-w-[420px] pl-10 pr-6 py-4 text-[1.5rem] cursor-default blueprint-dark-text"
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
      className="min-h-[55vh] flex flex-col justify-center py-8"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0.15, y: 40 }}
      transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="flex items-center gap-2 mb-6" style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'hsl(var(--ink-faint))' }}>
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
        <h2>From ideas to <span className="accent">production AI</span></h2>
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
          <div className="sticky" style={{ top: 'calc(50vh - 350px)', maxWidth: 500, height: 600, margin: '40px auto 0' }}>
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
