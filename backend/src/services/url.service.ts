import { Url, UrlRepository } from '../repositories/url.repo';

import { nanoid } from 'nanoid';

export class UrlService {
  private repo = new UrlRepository();

  async encode(longUrl: string): Promise<Url> {
    const shortCode = nanoid(6);
    return this.repo.createUrl(longUrl, shortCode);
  }

  async decode(shortCode: string): Promise<string | null> {
    const url = await this.repo.findByShortCode(shortCode);
    return url?.longUrl ?? null;
  }

  async getStats(shortCode: string): Promise<Url | null> {
    return this.repo.findByShortCode(shortCode);
  }

  async listUrls(): Promise<Url[]> {
    return this.repo.findAll();
  }

  async searchUrls(query: string): Promise<Url[]> {
    return this.repo.findByLongUrlMatch(query);
  }

  async handleRedirect(shortCode: string): Promise<string | null> {
    const url = await this.repo.findByShortCode(shortCode);
    if (url) {
      await this.repo.incrementVisitCount(shortCode);
      return url.longUrl;
    }
    return null;
  }
}
