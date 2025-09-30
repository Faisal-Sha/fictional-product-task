import styles from '@/styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <h3>EcoFlow Bottle</h3>
        <p>Crafted for explorers, designed for the planet.</p>
      </div>
      <div className={styles.links}>
        <a href="https://www.instagram.com" rel="noopener noreferrer" target="_blank">Instagram</a>
        <a href="https://www.twitter.com" rel="noopener noreferrer" target="_blank">Twitter</a>
        <a href="mailto:hello@ecoflow.com">Contact</a>
      </div>
      <p className={styles.copy}>© {new Date().getFullYear()} EcoFlow Bottle. All rights reserved.</p>
    </footer>
  );
}
