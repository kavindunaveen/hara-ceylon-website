import { PrismaClient, Currency, CouponType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // ----- Categories -----
  const teaCat = await prisma.category.upsert({
    where: { slug: "tea" },
    update: {},
    create: { slug: "tea", name: "Tea", order: 1 },
  });
  const coffeeCat = await prisma.category.upsert({
    where: { slug: "coffee" },
    update: {},
    create: { slug: "coffee", name: "Coffee", order: 2 },
  });

  // ----- Products (ported from legacy/index.html + shop.html) -----
  // Pricing is placeholder — admin should update from /admin/products.
  const seedProducts = [
    {
      slug: "premium-ceylon-black-tea",
      title: "Premium Ceylon Black",
      shortDescription:
        "Bold and full-bodied Ceylon black tea with a smooth, refreshing finish.",
      description:
        "Our Premium Ceylon Black Tea is handpicked from the lush highlands of Sri Lanka. Bold, full-bodied, and rich in colour, it delivers a smooth, refreshing finish in every cup. Carefully crafted to honour centuries of tea-making heritage.",
      categoryId: teaCat.id,
      images: ["/img/PREMIUM-BLACK-TEA.png", "/img/Black-tea1.png"],
      stock: 50,
      weightGrams: 100,
      isFeatured: true,
      prices: { LKR: 1800, USD: 7.5, GBP: 5.9 },
    },
    {
      slug: "premium-green-tea",
      title: "Premium Green Tea",
      shortDescription:
        "Light and refreshing Ceylon green tea with a clean, soothing taste.",
      description:
        "Light, clean and refreshing, our Premium Green Tea is sourced from the misty mountain slopes of Ceylon. Naturally rich in antioxidants, it offers a soothing taste with a delicate aroma — a perfect ritual at any time of day.",
      categoryId: teaCat.id,
      images: ["/img/PREMIUM-GREEN-TEA.png", "/img/Green-tea1.png"],
      stock: 50,
      weightGrams: 100,
      isFeatured: true,
      prices: { LKR: 1900, USD: 7.9, GBP: 6.2 },
    },
    {
      slug: "arabica-extra-fine-medium-roasted-coffee",
      title: "Arabica Extra Fine Medium Roasted Coffee",
      shortDescription:
        "Rich Arabica coffee with deep roasted notes and a smooth aroma.",
      description:
        "Grown in the fertile soils of Sri Lanka's renowned coffee regions, our Arabica Extra Fine Medium Roasted Coffee unveils deep, smooth flavours with every cup. Slow-roasted to perfection for a refined balance of aroma and taste.",
      categoryId: coffeeCat.id,
      images: [
        "/img/Arabica-Extra-Fine-Medium-Roasted-Coffee.png",
        "/img/Medium-Roasted-Coffee.png",
      ],
      stock: 40,
      weightGrams: 250,
      isFeatured: true,
      prices: { LKR: 2400, USD: 9.9, GBP: 7.9 },
    },
    {
      slug: "arabica-medium-dark-roasted-coffee",
      title: "Arabica Medium Dark Roasted Coffee",
      shortDescription:
        "Smooth medium-dark roasted Arabica coffee with refined flavor and aroma.",
      description:
        "Our Arabica Medium Dark Roasted Coffee blends tradition with modern craftsmanship. Expertly harvested and roasted to a deeper finish, it carries bold, full-flavoured notes balanced by a refined, smooth aroma.",
      categoryId: coffeeCat.id,
      images: [
        "/img/Arabica-Medium-Dark-Rosated-Coffee.png",
        "/img/Dark-Rosated-Coffee.png",
      ],
      stock: 40,
      weightGrams: 250,
      isFeatured: true,
      prices: { LKR: 2500, USD: 10.5, GBP: 8.2 },
    },
  ];

  for (const p of seedProducts) {
    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        description: p.description,
        shortDescription: p.shortDescription,
        categoryId: p.categoryId,
        images: p.images,
        stock: p.stock,
        weightGrams: p.weightGrams,
        isFeatured: p.isFeatured,
        isActive: true,
      },
      create: {
        slug: p.slug,
        title: p.title,
        description: p.description,
        shortDescription: p.shortDescription,
        categoryId: p.categoryId,
        images: p.images,
        stock: p.stock,
        weightGrams: p.weightGrams,
        isFeatured: p.isFeatured,
      },
    });

    for (const [currency, amount] of Object.entries(p.prices)) {
      await prisma.productPrice.upsert({
        where: {
          productId_currency: {
            productId: product.id,
            currency: currency as Currency,
          },
        },
        update: { amount },
        create: {
          productId: product.id,
          currency: currency as Currency,
          amount,
        },
      });
    }
    console.log(`  ✓ Product seeded: ${p.title}`);
  }

  // ----- Shipping Zones -----
  const zones = [
    {
      name: "Sri Lanka",
      countries: ["LK"],
      freeShippingMinLKR: 10000,
      rates: [
        { min: 0, max: 500, lkr: 350, usd: 1.5, gbp: 1.2 },
        { min: 500, max: 1000, lkr: 500, usd: 2.0, gbp: 1.7 },
        { min: 1000, max: 5000, lkr: 800, usd: 3.5, gbp: 2.8 },
      ],
    },
    {
      name: "United Kingdom",
      countries: ["GB"],
      freeShippingMinGBP: 60,
      rates: [
        { min: 0, max: 500, lkr: 4500, usd: 18, gbp: 14.5 },
        { min: 500, max: 1000, lkr: 6500, usd: 26, gbp: 21 },
        { min: 1000, max: 5000, lkr: 9500, usd: 38, gbp: 30 },
      ],
    },
    {
      name: "Rest of World",
      countries: [],
      freeShippingMinUSD: 100,
      rates: [
        { min: 0, max: 500, lkr: 6000, usd: 24, gbp: 19 },
        { min: 500, max: 1000, lkr: 9000, usd: 36, gbp: 28 },
        { min: 1000, max: 5000, lkr: 13000, usd: 52, gbp: 41 },
      ],
    },
  ];

  for (const z of zones) {
    const existing = await prisma.shippingZone.findFirst({ where: { name: z.name } });
    const zone = existing
      ? await prisma.shippingZone.update({
          where: { id: existing.id },
          data: {
            countries: z.countries,
            freeShippingMinLKR: z.freeShippingMinLKR ?? null,
            freeShippingMinUSD: z.freeShippingMinUSD ?? null,
            freeShippingMinGBP: z.freeShippingMinGBP ?? null,
          },
        })
      : await prisma.shippingZone.create({
          data: {
            name: z.name,
            countries: z.countries,
            freeShippingMinLKR: z.freeShippingMinLKR ?? null,
            freeShippingMinUSD: z.freeShippingMinUSD ?? null,
            freeShippingMinGBP: z.freeShippingMinGBP ?? null,
          },
        });

    await prisma.shippingRate.deleteMany({ where: { zoneId: zone.id } });
    for (const r of z.rates) {
      await prisma.shippingRate.create({
        data: {
          zoneId: zone.id,
          minWeightG: r.min,
          maxWeightG: r.max,
          amountLKR: r.lkr,
          amountUSD: r.usd,
          amountGBP: r.gbp,
        },
      });
    }
    console.log(`  ✓ Shipping zone seeded: ${z.name}`);
  }

  // ----- Sample Coupon -----
  await prisma.coupon.upsert({
    where: { code: "WELCOME10" },
    update: {},
    create: {
      code: "WELCOME10",
      type: CouponType.PERCENT,
      value: 10,
      isActive: true,
    },
  });
  console.log("  ✓ Coupon seeded: WELCOME10");

  // ----- First Admin -----
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@haraceylon.com";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";
  const adminName = process.env.ADMIN_NAME ?? "Hara Ceylon Admin";

  const hashed = await bcrypt.hash(adminPassword, 10);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: "ADMIN", name: adminName },
    create: {
      email: adminEmail,
      hashedPassword: hashed,
      name: adminName,
      role: "ADMIN",
      emailVerified: new Date(),
    },
  });
  console.log(`  ✓ Admin user seeded: ${adminEmail}`);

  console.log("\nSeed complete.\n");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
