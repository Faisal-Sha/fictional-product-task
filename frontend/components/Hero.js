import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from '@/styles/Hero.module.css';

const HEADLINES = {
  a: 'Hydrate sustainably with EcoFlow Bottle',
  b: 'Meet EcoFlow: The smarter reusable bottle'
};

export default function Hero({ variant = 'a' }) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 120]);
  const y2 = useTransform(scrollY, [0, 300], [0, -120]);
  const [headline, setHeadline] = useState(HEADLINES[variant] || HEADLINES.a);

  useEffect(() => {
    setHeadline(HEADLINES[variant] || HEADLINES.a);
  }, [variant]);

  return (
    <section className={styles.hero}>
      <motion.div className={styles.background} style={{ y: y2 }} />
      <motion.div className={styles.bottle} style={{ y: y1 }}>
        <img src="https://res.cloudinary.com/demo/image/upload/bottle.png" alt="EcoFlow Bottle" />
      </motion.div>
      <div className={styles.content}>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {headline}
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          Keep drinks cold for 24 hours or hot for 12 with recycled stainless steel and plant-based insulation.
        </motion.p>
        <motion.div className={styles.ctas} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <a href="#preorder" className={styles.primaryCta}>Pre-order now</a>
          <a href="#features" className={styles.secondaryCta}>Explore features</a>
        </motion.div>
      </div>
    </section>
  );
}
