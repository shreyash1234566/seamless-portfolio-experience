const Footer = () => (
  <footer className="relative z-[2] py-10 px-[60px] mt-8"
    style={{ borderTop: '1px solid hsl(var(--ink-faint))' }}>
    <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontStyle: 'italic' }}>
        Avery Sketch
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'hsl(var(--ink-faint))' }}>
        © 2026 — triple-click to sign the sketchbook
      </div>
      <div className="flex gap-5">
        {['GitHub', 'LinkedIn', 'Email'].map(link => (
          <a key={link} href="#"
            className="transition-colors duration-200 hover:underline"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'hsl(var(--ink-light))', textDecoration: 'none' }}>
            {link}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
