import { motion } from 'framer-motion';
import styles from '@/styles/ProductGrid.module.css';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 } })
};

export default function ProductGrid({ products = [] }) {
  return (
    <section className={styles.section} id="features">
      <div className={styles.header}>
        <h2>Choose the EcoFlow that fits your lifestyle</h2>
        <p>Crafted with recycled stainless steel and shipped carbon-neutral. Each bottle includes a QR code for refill locations.</p>
      </div>
      <div className={styles.grid}>
        {products.map((product, index) => (
          <motion.article
            className={styles.card}
            key={product._id || product.id}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <img src={product.imageUrl} alt={product.name} loading="lazy" />
            <div className={styles.cardContent}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <ul>
                {product.features?.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <div className={styles.meta}>
                <span className={styles.price}>${product.price.toFixed(2)}</span>
                <span className={styles.inventory}>{product.inventory} in stock</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
