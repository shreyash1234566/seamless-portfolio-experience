import { footerMeta } from '@/data/portfolio';

const Footer = () => (
  <footer className="relative z-[2] py-10 px-[60px] mt-8"
    style={{ borderTop: '1px solid hsl(var(--ink-faint))' }}>
    <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontStyle: 'italic' }}>
        {footerMeta.brand}
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', color: 'hsl(var(--ink-faint))' }}>
        {footerMeta.copyright}
      </div>
      <div className="flex gap-5">
        {footerMeta.links.map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noreferrer"
            className="transition-colors duration-200 hover:underline"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', color: 'hsl(var(--ink-light))', textDecoration: 'none' }}>
            {link.label}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
