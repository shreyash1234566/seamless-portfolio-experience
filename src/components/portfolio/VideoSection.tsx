import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { videoContent } from '@/data/portfolio';

const VideoSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (iframeLoaded) {
      setShowFallback(false);
      return;
    }
    const id = window.setTimeout(() => {
      setShowFallback(true);
    }, 7000);
    return () => window.clearTimeout(id);
  }, [iframeLoaded]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full max-w-[1400px] mx-auto py-32 px-8 md:px-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 lg:gap-24 items-center">
        
        {/* Left Side: Information */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6 z-10"
        >
          <div className="section-label">{videoContent.label}</div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1 }}>
            {videoContent.headingLine1} <br />
            <span className="italic relative inline-block">
              {videoContent.headingAccent}
              <span 
                className="absolute bottom-2 left-0 right-0 h-3 -z-10" 
                style={{ background: 'hsl(var(--yellow))', transform: 'rotate(-2deg)' }} 
              />
            </span>
          </h2>
          <p style={{ fontSize: '1.5rem', lineHeight: 1.7, color: 'hsl(var(--ink-light))', maxWidth: '480px' }}>
            {videoContent.description}
          </p>
          <ul className="flex flex-col gap-3 mt-4" style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem' }}>
            {videoContent.bullets.map((bullet) => (
              <li key={bullet} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full" style={{ background: 'hsl(var(--ink))' }} />
                {bullet}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right Side: Media/Video Panel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full"
        >
          <div className="portfolio-card" style={{ maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="video-wrapper" style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', background: '#fff' }}>
              {!showFallback ? (
                <iframe
                  src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7357861053755498496?compact=1"
                  height="399"
                  width="100%"
                  frameBorder="0"
                  allowFullScreen={true}
                  loading="lazy"
                  title="Embedded post"
                  style={{ display: 'block' }}
                  onLoad={() => setIframeLoaded(true)}
                ></iframe>
              ) : (
                <div
                  className="flex items-center justify-center text-center p-8"
                  style={{ minHeight: 260, background: '#f4f1e8', color: 'hsl(var(--ink-light))' }}
                >
                  <div>
                    <p style={{ fontSize: '1.5rem', marginBottom: 12 }}>
                      LinkedIn embed is blocked by privacy or network settings.
                    </p>
                    <a
                      href="https://www.linkedin.com/feed/update/urn:li:ugcPost:7357861053755498496"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#0a66c2', fontWeight: 700, textDecoration: 'none' }}
                    >
                      Open video on LinkedIn
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="social-link" style={{ textAlign: 'left' }}>
              <a href="https://www.linkedin.com/feed/update/urn:li:ugcPost:7357861053755498496" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 style={{ textDecoration: 'none', color: '#0a66c2', fontWeight: 600, fontSize: '15px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                View original LinkedIn post
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default VideoSection;