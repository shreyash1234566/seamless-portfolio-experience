import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { contactMeta, siteIdentity } from '@/data/portfolio';

const ContactSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const buildComposeLinks = () => {
    const subject = encodeURIComponent(`Portfolio message from ${name.trim()}`);
    const body = encodeURIComponent(`Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`);
    const to = encodeURIComponent(siteIdentity.email);

    return {
      mailto: `mailto:${siteIdentity.email}?subject=${subject}&body=${body}`,
      gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`,
      outlook: `https://outlook.office.com/mail/deeplink/compose?to=${to}&subject=${subject}&body=${body}`,
    };
  };

  const handleSend = () => {
    if (!name.trim() || !email.trim() || !message.trim()) return;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) return;

    const links = buildComposeLinks();

    // Root cause: mailto depends on OS/browser default mail client, which is often not configured.
    // Open Gmail compose in browser first; if blocked, user can use fallback links below.
    window.open(links.gmail, '_blank', 'noopener,noreferrer');
  };

  const inputStyle = {
    fontFamily: 'var(--font-hand)',
    fontSize: '1.5rem',
    padding: '10px 14px',
    background: 'transparent',
    border: 'none',
    borderBottom: '2px solid hsl(var(--ink-faint))',
    outline: 'none',
    width: '100%',
    transition: 'border-color 0.3s',
    color: 'hsl(var(--ink))',
  };

  return (
    <section id="contact" className="section" ref={ref}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[60px] items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">get in touch</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '3.12rem', marginBottom: 16 }}>
            {contactMeta.heading}<br /><span className="accent">say hi</span>
          </h2>
          <p style={{ color: 'hsl(var(--ink-light))', fontSize: '1.5rem', marginBottom: 24 }}>
            {contactMeta.subheading}
          </p>
          <div className="flex flex-col gap-3">
            {contactMeta.links.map(meta => (
              <a key={meta.label} href={meta.href}
                className="flex items-center gap-2.5 py-2 transition-all duration-300 hover:translate-x-2"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', color: 'hsl(var(--ink))', textDecoration: 'none', borderBottom: '1px dashed hsl(var(--ink-faint))' }}>
                <span style={{ fontSize: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'hsl(var(--ink-faint))', width: 60, flexShrink: 0 }}>{meta.label}</span>
                {meta.value}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="p-8"
          style={{
            background: 'hsl(var(--bg-card))',
            border: '1.5px solid hsl(var(--ink-faint))',
            borderRadius: 'var(--r-sketchy2)',
            boxShadow: '6px 6px 0 hsl(var(--shadow)/0.05), 10px 10px 0 hsl(var(--shadow)/0.02)',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex flex-col gap-1.5 mb-5">
            <label style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'hsl(var(--ink-faint))' }}>your name</label>
            <input style={inputStyle} value={name} onChange={e => setName(e.target.value)} placeholder={siteIdentity.name} />
          </div>
          <div className="flex flex-col gap-1.5 mb-5">
            <label style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'hsl(var(--ink-faint))' }}>your email</label>
            <input style={inputStyle} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="hello@example.com" />
          </div>
          <div className="flex flex-col gap-1.5 mb-5">
            <label style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'hsl(var(--ink-faint))' }}>your message</label>
            <textarea style={{ ...inputStyle, minHeight: 120, resize: 'vertical' }} value={message} onChange={e => setMessage(e.target.value)} placeholder="I saw your sketchbook and…" />
          </div>
          <div className="flex items-center gap-4">
            <button className="btn-sketch" onClick={handleSend}>Send →</button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
