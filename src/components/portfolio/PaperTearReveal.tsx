import { motion } from 'framer-motion';
import { ReactNode } from 'react';

// Fail-safe reveal: content stays visible even if viewport observers are flaky.
export const PaperTearReveal = ({ children, delay = 0.1 }: { children: ReactNode, delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 1, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10px" }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      className="relative z-10"
    >
      {children}
    </motion.div>
  );
};
