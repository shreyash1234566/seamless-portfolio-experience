import { useEffect, useState } from 'react';
import { navLinks } from '@/data/portfolio';

const Navbar = () => {
  const [isBlueprint, setIsBlueprint] = useState(false);

  useEffect(() => {
    if (isBlueprint) {
      document.body.classList.add('theme-blueprint');
    } else {
      document.body.classList.remove('theme-blueprint');
    }
  }, [isBlueprint]);

  return (
    <nav className="fixed top-[16px] right-5 z-[80] flex items-center gap-2 text-[2.1rem] font-bold"
      style={{
        background: 'hsla(var(--bg),0.85)',
        backdropFilter: 'blur(8px)',
        border: '2px solid hsl(var(--ink-faint))',
        borderRadius: 'var(--r-sketchy2)',
        padding: '8px 16px',
        boxShadow: '4px 4px 0 hsl(var(--shadow)/0.05)',
        fontFamily: 'var(--font-hand)'
      }}>
      
      <button 
        onClick={() => setIsBlueprint(!isBlueprint)}
        className="mr-2 px-3 py-1 text-[1.4rem] boiling-line"
        style={{
          background: 'none',
          border: '2px solid hsl(var(--ink-faint))',
          borderRadius: 'var(--r-sketchy3)',
          color: 'hsl(var(--ink))',
          cursor: 'pointer',
          fontFamily: 'var(--font-mono)',
          textTransform: 'uppercase',
          fontSize: '0.95rem'
        }}
      >
        {isBlueprint ? 'Switch to Sketch' : 'Switch to Blueprint'}
      </button>

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
    <style>{`
      .group:hover .path-sketch-line {
        stroke-dashoffset: 0 !important;
      }
    `}</style>
    </nav>
  );
};

export default Navbar;
