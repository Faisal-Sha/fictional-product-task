import Product from '../models/Product.js';

const seedProducts = [
  {
    name: 'EcoFlow Lite 500ml',
    description: 'Featherlight bottle crafted from 80% recycled steel with bamboo lid.',
    price: 39,
    inventory: 120,
    imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1699999999/water-bottle.jpg',
    features: ['500ml capacity', 'Dishwasher safe', 'Includes smart hydration reminders']
  },
  {
    name: 'EcoFlow Trek 750ml',
    description: 'Adventure-ready thermal bottle with modular tea infuser.',
    price: 59,
    inventory: 80,
    imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1699999999/water-bottle-2.jpg',
    features: ['12h heat retention', 'Clip-on carry loop', 'Tea/fruit infuser']
  },
  {
    name: 'EcoFlow Pro 1L',
    description: 'Large-format smart bottle with UV-C purification and NFC refill map.',
    price: 89,
    inventory: 45,
    imageUrl: 'https://res.cloudinary.com/demo/image/upload/v1699999999/water-bottle-3.jpg',
    features: ['UV-C self-clean', 'Companion mobile app', 'Offset shipping emissions']
  }
];

export async function ensureSeedData() {
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany(seedProducts);
  }
}
