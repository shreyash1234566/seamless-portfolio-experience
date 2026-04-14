import { useEffect, useRef, useState } from 'react';

const paths = [
  "M0,12 C80,4 160,20 240,12 C320,4 400,20 480,12 C560,4 640,20 720,12 C760,8 780,14 800,12",
  "M0,12 C80,20 160,4 240,14 C320,22 400,6 480,14 C560,22 640,6 720,14 C760,18 780,10 800,12",
  "M0,10 C100,22 200,4 300,14 C400,24 500,6 600,16 C700,24 750,8 800,12",
  "M0,12 C80,4 160,20 240,8 C320,2 400,18 480,8 C560,2 640,16 720,8 C760,4 782,14 800,12",
];

const WavyDivider = ({ variant = 0 }: { variant?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setDrawn(true); obs.disconnect(); }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="divider" ref={ref}>
      <svg viewBox="0 0 800 24" preserveAspectRatio="none">
        <path
          d={paths[variant % paths.length]}
          style={{
            strokeDasharray: 1000,
            strokeDashoffset: drawn ? 0 : 1000,
            transition: 'stroke-dashoffset 2s cubic-bezier(0.25,1,0.5,1)',
          }}
        />
      </svg>
    </div>
  );
};

export default WavyDivider;
