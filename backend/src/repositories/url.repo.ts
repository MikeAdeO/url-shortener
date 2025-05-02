import { prisma } from "../lib/prisma";
export interface Url {
    id: string;
    longUrl: string;
    shortCode: string;
    createdAt: Date;
    visitCount: number;
  }


export class UrlRepository {
  async createUrl(longUrl: string, shortCode: string): Promise<Url> {
    return prisma.url.create({
      data: { longUrl, shortCode }
    });
  }

  async findByShortCode(shortCode: string): Promise<Url | null> {
    return prisma.url.findUnique({
      where: { shortCode }
    });
  }

  async findAll(): Promise<Url[]> {
    return prisma.url.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findByLongUrlMatch(query: string): Promise<Url[]> {
    return prisma.url.findMany({
      where: {
        longUrl: {
          contains: query,
        }
      }
    });
  }

  async incrementVisitCount(shortCode: string): Promise<void> {
    await prisma.url.update({
      where: { shortCode },
      data: { visitCount: { increment: 1 } }
    });
  }
}
