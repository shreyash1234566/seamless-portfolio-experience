import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { videoContent } from '@/data/portfolio';

const VideoSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const yImage = useTransform(scrollYProgress, [0, 1], [-40, 40]);

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

        {/* Right Side: Media/Video Panel with fuzzy hover */}
        <motion.div
          ref={videoRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-[4/5] md:aspect-video rounded-xl overflow-hidden cursor-pointer group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            boxShadow: '16px 24px 60px hsl(var(--shadow)/0.12), 4px 8px 16px hsl(var(--shadow)/0.06)',
            border: '2px solid hsl(var(--ink))',
            borderRadius: 'var(--r-sketchy)',
            transform: 'rotate(1deg)' // Slight skew for sketchbook theme
          }}
        >
          {/* Main Media Image (Using placeholder since video might fail to autoplay on some stacks, 
              but you can drop a <video> tag here) */}
           <motion.div 
            className="absolute inset-0 w-[110%] h-[110%] -left-[5%] -top-[5%]" 
            style={{ y: yImage }}
          >
            <img 
              src={videoContent.imageUrl}
              alt={videoContent.imageAlt}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Fuzzy/Blur overlay mask on hover */}
          <motion.div 
            className="absolute inset-0 pointer-events-none transition-all duration-500 ease-out flex items-center justify-center"
            style={{ 
              backdropFilter: isHovered ? 'blur(12px) contrast(1.1) sepia(1.2)' : 'blur(0px)',
              backgroundColor: isHovered ? 'rgba(255, 230, 200, 0.15)' : 'transparent',
              opacity: isHovered ? 1 : 0
            }}
          >
            {/* Play button / interaction hint on hover */}
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                background: 'hsl(var(--ink))',
                color: 'hsl(var(--bg))',
                transform: isHovered ? 'scale(1)' : 'scale(0.8)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                border: '2px solid hsl(var(--yellow))'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
};

export default VideoSection;