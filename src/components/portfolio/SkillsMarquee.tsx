const skills = [
  'NEXT.JS', 'TYPESCRIPT', 'GSAP', 'THREE.JS', 'FRAMER MOTION',
  'TAILWIND', 'REACT', 'FIGMA', 'NODE.JS', 'WEBGL',
  'CSS ANIMATION', 'SUPABASE', 'VITE', 'GIT',
];

const SkillsMarquee = () => {
  const items = [...skills, ...skills]; // double for seamless loop
  return (
    <div className="overflow-hidden relative z-[2]"
      style={{
        borderTop: '1.5px solid hsl(var(--ink-faint))',
        borderBottom: '1.5px solid hsl(var(--ink-faint))',
        background: 'hsl(var(--bg-card))',
        padding: '14px 0',
      }}>
      <div className="flex w-max hover:[animation-play-state:paused]"
        style={{ animation: 'marquee-scroll 28s linear infinite' }}>
        {items.map((skill, i) => (
          <div key={i} className="flex items-center gap-5 px-7 whitespace-nowrap"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'hsl(var(--ink-light))' }}>
            <span className="w-[5px] h-[5px] rounded-full shrink-0" style={{ background: 'hsl(var(--yellow))' }} />
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsMarquee;
