import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { videoContent } from '@/data/portfolio';

const VideoSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section 
      ref={containerRef}
      className="relative w-full max-w-[1400px] mx-auto py-16 md:py-32 px-8 md:px-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 lg:gap-24 items-center">
        
        {/* Left Side: Information */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6 z-10 w-full"
        >
          <div className="section-label">{videoContent.label}</div>
          <h2 className="font-serif leading-[1.1] text-3xl sm:text-4xl md:text-5xl lg:text-[4rem]">
            {videoContent.headingLine1} <br />
            <span className="italic relative inline-block">
              {videoContent.headingAccent}
              <span 
                className="absolute bottom-2 left-0 right-0 h-3 -z-10" 
                style={{ background: 'hsl(var(--yellow))', transform: 'rotate(-2deg)' }} 
              />
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed max-w-[480px]" style={{ color: 'hsl(var(--ink-light))' }}>
            {videoContent.description}
          </p>
          <ul className="flex flex-col gap-3 mt-4 font-mono text-sm sm:text-base md:text-lg">
            {videoContent.bullets.map((bullet) => (
              <li key={bullet} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: 'hsl(var(--ink))' }} />
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
          <div className="portfolio-card w-full relative" style={{ maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <div 
              className="relative w-full overflow-hidden p-3"
              style={{
                background: 'hsl(var(--bg-card))',
                border: '2px solid hsl(var(--ink))',
                borderRadius: 'var(--r-sketchy3)',
                boxShadow: '10px 10px 0 hsl(var(--shadow)/0.07), 18px 18px 40px rgba(0,0,0,0.04)',
                transform: 'rotate(1deg)',
              }}
            >
              {/* Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rotate-2 w-[72px] h-[18px] rounded-sm z-[5]"
                style={{ background: 'hsla(40,100%,68%,0.75)' }}>
                <div className="absolute inset-0" style={{ background: 'repeating-linear-gradient(90deg,transparent,transparent 4px,rgba(255,255,255,0.3) 4px,rgba(255,255,255,0.3) 5px)' }} />
              </div>
              
              <div className="w-full bg-[#f8f9fa] rounded" style={{ minHeight: '399px' }}>
                <iframe
                  src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7357861053755498496?compact=1"
                  height="399"
                  width="100%"
                  frameBorder="0"
                  allowFullScreen={true}
                  loading="lazy"
                  title="Embedded post"
                  style={{ display: 'block', borderRadius: '4px' }}
                ></iframe>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default VideoSection;