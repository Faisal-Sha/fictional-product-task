import Head from 'next/head';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import LeadForm from '@/components/LeadForm';
import Footer from '@/components/Footer';

export default function Home({ products, variant, fetchedFrom }) {
  return (
    <>
      <Head>
        <title>EcoFlow Bottle — Sustainable hydration</title>
        <meta name="description" content="EcoFlow is an eco-friendly smart water bottle with thermal control and refillable tracking." />
      </Head>
      <Hero variant={variant} />
      <main>
        <ProductGrid products={products} />
        <LeadForm />
        <section style={{ padding: '3rem clamp(1rem,5vw,5rem)', background: '#fff' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem' }}>Data served from {fetchedFrom}</h2>
          <p style={{ textAlign: 'center', color: '#4a5a66', maxWidth: '48rem', margin: '1rem auto 0' }}>
            Our backend API is protected with JWT authentication, Redis caching, rate limiting, and monitored with Prometheus metrics.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}

export async function getServerSideProps({ query }) {
  const variant = query.variant === 'b' ? 'b' : 'a';
  let products = [];
  let fetchedFrom = 'cache';
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_BASE_URL || 'http://localhost:4000';
    const response = await fetch(`${baseUrl}/api/products`);
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }
    const payload = await response.json();
    products = payload.data || [];
    fetchedFrom = payload.source || 'api';
  } catch (error) {
    products = [
      {
        id: 'fallback-1',
        name: 'EcoFlow Explorer',
        description: 'Fallback product data when API is unavailable.',
        price: 49,
        inventory: 0,
        imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1699999999/sample.jpg',
        features: ['Keeps drinks cool', 'Built from recycled steel']
      }
    ];
    fetchedFrom = 'fallback (API unreachable)';
  }

  return {
    props: {
      products,
      variant,
      fetchedFrom
    }
  };
}
