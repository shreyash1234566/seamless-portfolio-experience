import { useState, useRef, Suspense } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import LaptopModel from './LaptopModel';
import { ErrorBoundary } from './ErrorBoundary';
import { projects, siteIdentity } from '@/data/portfolio';

const ProjectsSection = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const goTo = (idx: number) => {
    if (idx === currentIdx) return;
    setFading(true);
    setTimeout(() => {
      setCurrentIdx(idx);
      setFading(false);
    }, 300);
  };

  const prev = () => goTo((currentIdx - 1 + projects.length) % projects.length);
  const next = () => goTo((currentIdx + 1) % projects.length);
  const p = projects[currentIdx];

  return (
    <section id="projects" className="section" ref={ref}>
      <p className="section-label">projects</p>
      <h2>Things I've <span className="accent">built</span></h2>

      <motion.div
        className="overflow-hidden w-full"
        style={{
          background: '#edecea',
          borderRadius: 12,
          border: '1.5px solid hsl(var(--ink-faint))',
          boxShadow: '0 20px 60px hsl(var(--shadow)/0.12), 0 2px 8px hsl(var(--shadow)/0.06)',
          transformStyle: 'preserve-3d',
        }}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {/* OS Chrome bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 select-none w-full"
          style={{ background: '#d9d7d4', borderBottom: '1px solid rgba(28,28,28,0.1)' }}>
          <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57', boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.4)' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e', boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.4)' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#28c840', boxShadow: 'inset 1px 1px 2px rgba(255,255,255,0.4)' }} />
          <div className="flex-1 text-center font-mono text-base md:text-lg lg:text-xl" style={{ color: 'hsl(var(--ink-light))' }}>
            ~/projects
          </div>
        </div>

        <div className="grid w-full grid-cols-1 md:grid-cols-[220px_1fr]" style={{ minHeight: 500 }}>
          {/* Sidebar */}
          <div className="hidden md:flex flex-col gap-4 p-[18px_18px_24px]"
            style={{ background: '#f0efe9', borderRight: '1px solid rgba(28,28,28,0.08)' }}>
            <div className="p-3 text-base lg:text-lg leading-relaxed"
              style={{
                background: 'hsl(var(--yellow-dim))',
                border: '1px solid hsla(40,100%,68%,0.5)',
                borderRadius: 4,
                boxShadow: '2px 2px 6px hsl(var(--shadow)/0.06)',
                transform: 'rotate(-1.5deg)',
              }}>
              Building production AI systems with measurable outcomes.
            </div>
            <div className="flex flex-col gap-2 mt-1">
              {[
                { label: 'Resume PDF', href: '/shreyash_resume_v3.pdf' },
                { label: 'GitHub Profile', href: siteIdentity.github },
                { label: 'LinkedIn Profile', href: siteIdentity.linkedin },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center w-full px-4 py-2 mt-1 text-sm font-medium transition-colors border rounded-md shadow-sm border-border bg-background hover:bg-accent hover:text-accent-foreground"
                  style={{ textDecoration: 'none' }}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-auto text-center font-mono text-2xl lg:text-3xl" style={{ color: 'hsl(var(--ink-faint))', animation: 'wave-anim 2.5s ease-in-out infinite', transformOrigin: '70% 70%' }}>
              o/
            </div>
          </div>

          {/* Main content */}
          <div className="p-7 relative overflow-visible w-full">
            <div className={`transition-all duration-300 w-full ${fading ? 'opacity-0 translate-y-4 scale-[0.98]' : 'opacity-100 translate-y-0 scale-100'}`}>
              {/* 3D Laptop */}
              <div className="w-full aspect-video mb-6 flex items-center justify-center">
                <ErrorBoundary fallback={
                  <div className="w-full h-full flex items-center justify-center rounded-lg" style={{ background: p.screenColor, minHeight: 200 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', color: '#fff', opacity: 0.7 }}>3D preview unavailable</span>
                  </div>
                }>
                  <Canvas camera={{ position: [0, 0, 4], fov: 45 }} style={{ width: '100%', height: '100%' }}>
                    <ambientLight intensity={0.7} />
                    <directionalLight position={[5, 5, 5]} intensity={0.5} />
                    <Suspense fallback={null}>
                      <LaptopModel screenColor={p.screenColor} imageUrl={p.imageUrl} />
                    </Suspense>
                  </Canvas>
                </ErrorBoundary>
              </div>

              <h3 className="blueprint-dark-text font-serif text-2xl md:text-[1.95rem] mb-2">{p.title}</h3>
              <p className="blueprint-dark-text break-words text-base md:text-lg lg:text-xl mb-3.5 leading-relaxed" style={{ color: 'hsl(var(--ink-light))' }}>{p.desc}</p>
              <div className="flex flex-nowrap md:flex-wrap overflow-x-auto snap-x snap-mandatory gap-1.5 mb-[18px] pb-2 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {p.stack.map(s => (
                  <span key={s} className="shrink-0 snap-center px-2.5 py-0.5 rounded-full blueprint-dark-text font-mono text-sm md:text-base border border-[hsl(var(--ink-faint))]"
                    style={{ background: 'hsl(var(--shadow)/0.06)', color: 'hsl(var(--ink-light))' }}>
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 font-mono text-sm md:text-base">
                {p.live ? (
                  <a href={p.live} target="_blank" rel="noreferrer" className="px-3.5 py-1.5 rounded transition-all duration-300 hover:-translate-y-0.5 no-underline font-mono text-sm md:text-base"
                    style={{ color: 'hsl(var(--blue))', border: '1px solid hsl(var(--blue))' }}>
                    ↗ Live
                  </a>
                ) : (
                  <span className="px-3.5 py-1.5 rounded font-mono text-sm md:text-base"
                    style={{ color: 'hsl(var(--ink-faint))', border: '1px dashed hsl(var(--ink-faint))' }}>
                    No live demo
                  </span>
                )}
                <a href={p.code} className="px-3.5 py-1.5 rounded transition-all duration-300 hover:-translate-y-0.5 no-underline font-mono text-sm md:text-base"
                  target="_blank" rel="noreferrer"
                  style={{ color: 'hsl(var(--blue))', border: '1px solid hsl(var(--blue))' }}>
                  ⌥ Code
                </a>
              </div>
            </div>

            {/* Nav row */}
            <div className="flex items-center justify-between w-full mt-4 pt-3 font-mono text-sm md:text-base border-t border-dashed border-[hsl(var(--ink-faint))]">
              <button onClick={prev} className="px-3.5 py-1.5 rounded transition-all duration-300 hover:bg-black/5 bg-transparent border-[1.5px] border-[hsl(var(--ink-faint))]"
                style={{ color: 'hsl(var(--ink-light))' }}>
                ← Prev
              </button>
              <div className="flex gap-[7px]">
                {projects.map((_, i) => (
                  <button key={i} onClick={() => goTo(i)}
                    className="w-2 h-2 rounded-full p-0 border-none transition-all duration-300"
                    style={{
                      background: i === currentIdx ? 'hsl(var(--ink))' : 'hsl(var(--ink-faint))',
                      transform: i === currentIdx ? 'scale(1.5)' : 'scale(1)',
                    }} />
                ))}
              </div>
              <button onClick={next} className="px-3.5 py-1.5 rounded transition-all duration-300 hover:bg-black/5 bg-transparent border-[1.5px] border-[hsl(var(--ink-faint))]"
                style={{ color: 'hsl(var(--ink-light))' }}>
                Next →
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
