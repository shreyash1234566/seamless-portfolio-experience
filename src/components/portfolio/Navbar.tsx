import { motion } from 'framer-motion';

const links = [
  { href: '#hero', label: 'home' },
  { href: '#about', label: 'about' },
  { href: '#skills', label: 'skills' },
  { href: '#projects', label: 'projects' },
  { href: '#experience', label: 'timeline' },
  { href: '#contact', label: 'contact' },
];

const Navbar = () => (
  <nav className="fixed top-[18px] right-5 z-[80] flex items-center gap-1.5 text-base"
    style={{
      background: 'hsla(40,30%,95%,0.85)',
      backdropFilter: 'blur(8px)',
      border: '1px solid hsl(var(--ink-faint))',
      borderRadius: 'var(--r-sketchy2)',
      padding: '6px 16px',
      boxShadow: '2px 2px 0 hsl(var(--shadow)/0.05)',
    }}>
    {links.map((link, i) => (
      <span key={link.href} className="flex items-center gap-1.5">
        {i > 0 && <span className="text-xs" style={{ color: 'hsl(var(--ink-faint))' }}>·</span>}
        <a href={link.href}
          className="relative px-1 py-0.5 transition-colors hover:text-foreground"
          style={{ color: 'hsl(var(--ink))', textDecoration: 'none' }}>
          {link.label}
          <motion.span
            className="absolute bottom-0 left-0 right-0 h-0.5 rounded"
            style={{ background: 'hsl(var(--yellow))', transformOrigin: 'right' }}
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1, transformOrigin: 'left' }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          />
        </a>
      </span>
    ))}
  </nav>
);

export default Navbar;
