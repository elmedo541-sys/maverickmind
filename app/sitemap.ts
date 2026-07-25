import { prisma } from "@/lib/prisma";
import type { MetadataRoute } from "next";

const BASE_URL = "https://maverickmind.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, services] = await Promise.all([
    prisma.product.findMany({ select: { id: true, createdAt: true } }),
    prisma.service.findMany({ select: { id: true, createdAt: true } }),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/products`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/services`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/products/${p.id}`,
    lastModified: p.createdAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE_URL}/services`,
    lastModified: s.createdAt,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticPages, ...productPages, ...servicePages];
}