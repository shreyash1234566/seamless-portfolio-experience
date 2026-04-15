import { useEffect, useState } from 'react';
import { navLinks } from '@/data/portfolio';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isBlueprint, setIsBlueprint] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isBlueprint) {
      document.body.classList.add('theme-blueprint');
    } else {
      document.body.classList.remove('theme-blueprint');
    }
  }, [isBlueprint]);

  return (
    <>
      <nav className="fixed top-[16px] right-2 sm:right-5 z-[80] flex flex-col items-end gap-2 text-[1.8rem] sm:text-[2.1rem] font-bold">
        <div className="flex items-center gap-1 sm:gap-2"
          style={{
            background: 'hsla(var(--bg),0.85)',
            backdropFilter: 'blur(8px)',
            border: '2px solid hsl(var(--ink-faint))',
            borderRadius: 'var(--r-sketchy2)',
            padding: '8px 12px',
            boxShadow: '4px 4px 0 hsl(var(--shadow)/0.05)',
            fontFamily: 'var(--font-hand)'
          }}>
          
          <button 
            onClick={() => setIsBlueprint(!isBlueprint)}
            className="mr-1 sm:mr-2 px-2 sm:px-3 py-1 text-[1.4rem] boiling-line whitespace-nowrap"
            style={{
              background: 'none',
              border: '2px solid hsl(var(--ink-faint))',
              borderRadius: 'var(--r-sketchy3)',
              color: 'hsl(var(--ink))',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              fontSize: '0.85rem'
            }}
          >
            <span className="hidden sm:inline">Switch to </span>
            {isBlueprint ? 'Sketch' : 'Blueprint'}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link, i) => (
            <span key={link.href} className="flex items-center gap-2">
              {i > 0 && <span className="text-[1.6rem]" style={{ color: 'hsl(var(--ink-faint))' }}>·</span>}
              <a href={link.href}
                className="relative px-1.5 py-0.5 transition-colors hover:text-foreground group"
                style={{ color: 'hsl(var(--ink))', textDecoration: 'none' }}>
                {link.label}
                
                {/* Sketchy Line on Hover */}
                <svg
                  className="absolute -bottom-1 left-0 w-full h-[12px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2,8 Q20,2 50,6 T98,2"
                    fill="none"
                    stroke="hsl(var(--yellow))"
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="path-sketch-line boiling-line"
                    style={{
                      strokeDasharray: '100',
                      strokeDashoffset: '100',
                      transition: 'stroke-dashoffset 0.4s ease-out',
                    }}
                  />
                </svg>
              </a>
            </span>
            ))}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="md:hidden flex items-center justify-center p-1.5 ml-1 transition-transform"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              border: '2px solid hsl(var(--ink-faint))',
              borderRadius: 'var(--r-sketchy)',
              color: 'hsl(var(--ink))',
              background: 'none'
            }}
          >
            {isMenuOpen ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2.5} />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden flex flex-col items-end gap-3 mt-1 mr-1 animate-in fade-in slide-in-from-top-2 duration-200"
            style={{
              background: 'hsla(var(--bg),0.95)',
              backdropFilter: 'blur(8px)',
              border: '2px solid hsl(var(--ink-faint))',
              borderRadius: 'var(--r-sketchy2)',
              padding: '16px 24px',
              boxShadow: '4px 4px 0 hsl(var(--shadow)/0.05)',
              fontFamily: 'var(--font-hand)'
            }}>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="relative text-[1.8rem] transition-colors hover:text-foreground group"
                style={{ color: 'hsl(var(--ink))', textDecoration: 'none' }}>
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      <style>{`
        .group:hover .path-sketch-line {
          stroke-dashoffset: 0 !important;
        }
      `}</style>
    </>
  );
};

export default Navbar;
