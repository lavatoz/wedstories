import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const templates = [
  {
    slug: 'kerala-traditional',
    name: 'Kerala Traditional',
    category: 'Traditional',
    description: 'Classic Kerala styling with red and gold hues, featuring traditional motifs.',
    previewImage: '/templates/kerala_traditional.jpg',
    componentName: 'KeralaTraditional'
  },
  {
    slug: 'kerala-kasavu',
    name: 'Kerala Kasavu',
    category: 'Kerala',
    description: 'Elegant off-white and gold borders inspired by the iconic Kasavu saree.',
    previewImage: '/templates/kerala_kasavu.jpg',
    componentName: 'KeralaKasavu'
  },
  {
    slug: 'royal-indian',
    name: 'Royal Indian',
    category: 'Luxury',
    description: 'Regal maroon and gold styling for a grand, majestic celebration.',
    previewImage: '/templates/royal_indian.jpg',
    componentName: 'RoyalIndian'
  },
  {
    slug: 'minimal-luxury',
    name: 'Minimal Luxury',
    category: 'Modern',
    description: 'Clean typography with plenty of whitespace and subtle luxury accents.',
    previewImage: '/templates/minimal_luxury.jpg',
    componentName: 'MinimalLuxury'
  },
  {
    slug: 'floral',
    name: 'Floral Essence',
    category: 'Floral',
    description: 'Soft pastels and watercolor floral borders for a romantic touch.',
    previewImage: '/templates/floral.jpg',
    componentName: 'Floral'
  },
  {
    slug: 'christian-kerala',
    name: 'Christian Elegance',
    category: 'Christian',
    description: 'Pure whites, silvers, and elegant serif typography for church weddings.',
    previewImage: '/templates/christian_kerala.jpg',
    componentName: 'ChristianKerala'
  },
  {
    slug: 'muslim-kerala',
    name: 'Muslim Grace',
    category: 'Muslim',
    description: 'Emerald greens and gold geometric patterns for a beautiful Nikah.',
    previewImage: '/templates/muslim_kerala.jpg',
    componentName: 'MuslimKerala'
  },
  {
    slug: 'hindu-kerala',
    name: 'Hindu Divine',
    category: 'Hindu',
    description: 'Warm colors, temple motifs, and lotus illustrations.',
    previewImage: '/templates/hindu_kerala.jpg',
    componentName: 'HinduKerala'
  },
  {
    slug: 'modern-editorial',
    name: 'Modern Editorial',
    category: 'Modern',
    description: 'Magazine-style layouts with bold typography and full-bleed imagery.',
    previewImage: '/templates/modern_editorial.jpg',
    componentName: 'ModernEditorial'
  },
  {
    slug: 'dark-luxury',
    name: 'Dark Luxury',
    category: 'Dark',
    description: 'Deep blacks and charcoal with striking metallic accents.',
    previewImage: '/templates/dark_luxury.jpg',
    componentName: 'DarkLuxury'
  }
];

async function main() {
  console.log('Start seeding...');
  for (const t of templates) {
    const template = await prisma.template.upsert({
      where: { slug: t.slug },
      update: {},
      create: t,
    });
    console.log(`Created/updated template with id: ${template.id}`);
  }
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
