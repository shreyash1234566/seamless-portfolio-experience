import { useEffect, useRef, useState } from 'react';
import HeroCanvas from '@/components/portfolio/HeroCanvas';
import Navbar from '@/components/portfolio/Navbar';
import ScrollProgress from '@/components/portfolio/ScrollProgress';
import HeroSection from '@/components/portfolio/HeroSection';
import WavyDivider from '@/components/portfolio/WavyDivider';
import AboutSection from '@/components/portfolio/AboutSection';
import SkillsMarquee from '@/components/portfolio/SkillsMarquee';
import SkillsSection from '@/components/portfolio/SkillsSection';
import ProjectsSection from '@/components/portfolio/ProjectsSection';
import TimelineSection from '@/components/portfolio/TimelineSection';
import TestimonialsSection from '@/components/portfolio/TestimonialsSection';
import ContactSection from '@/components/portfolio/ContactSection';
import VideoSection from '@/components/portfolio/VideoSection';
import { CustomCursor } from '@/components/portfolio/CustomCursor';
import { PaperTearReveal } from '@/components/portfolio/PaperTearReveal';
import Footer from '@/components/portfolio/Footer';
import { ChatbotWidget } from '@/components/portfolio/ChatbotWidget';
import { ErrorBoundary } from '@/components/portfolio/ErrorBoundary';

const Index = () => {
  // Fade hero canvas on scroll
  const [canvasOpacity, setCanvasOpacity] = useState(0.8);
  const [lightweightMode, setLightweightMode] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = window.matchMedia('(max-width: 900px)').matches;
    const lowPowerCpu = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4;

    setLightweightMode(reducedMotion || mobile || lowPowerCpu);
  }, []);

  useEffect(() => {
    if (lightweightMode) {
      setCanvasOpacity(0);
      return;
    }

    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        const opacity = Math.max(0, 1 - (window.scrollY / window.innerHeight) * 1.5) * 0.8;
        setCanvasOpacity(opacity);
        rafRef.current = null;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [lightweightMode]);

  return (
    <>
      {!lightweightMode && (
        <ErrorBoundary>
          <CustomCursor />
        </ErrorBoundary>
      )}
      {!lightweightMode && (
        <ErrorBoundary>
          <div style={{ opacity: canvasOpacity }}>
            <HeroCanvas />
          </div>
        </ErrorBoundary>
      )}
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      
      <PaperTearReveal delay={0.1}>
        <WavyDivider variant={0} />
        <VideoSection />
      </PaperTearReveal>
      
      <PaperTearReveal delay={0.1}>
        <WavyDivider variant={2} />
        <AboutSection />
      </PaperTearReveal>

      <PaperTearReveal delay={0.1}>
        <WavyDivider variant={1} />
        <SkillsMarquee />
        <SkillsSection />
      </PaperTearReveal>

      <PaperTearReveal delay={0.1}>
        <WavyDivider variant={2} />
        <ProjectsSection />
      </PaperTearReveal>

      <PaperTearReveal delay={0.1}>
        <WavyDivider variant={3} />
        <TimelineSection />
      </PaperTearReveal>

      <PaperTearReveal delay={0.1}>
        <WavyDivider variant={0} />
        <TestimonialsSection />
      </PaperTearReveal>

      <PaperTearReveal delay={0.1}>
        <WavyDivider variant={1} />
        <ContactSection />
      </PaperTearReveal>
      
      <Footer />
      
      <ChatbotWidget />
    </>
  );
};

export default Index;
