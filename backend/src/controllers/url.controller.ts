
import { Request, Response, NextFunction } from 'express';
import { UrlService } from '../services/url.service';
import { createError } from '../middlewares/errorHandler';
const service = new UrlService();


export const encodeUrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { longUrl } = req.body;
    if (!longUrl) {
    return next(createError('longUrl is required', 400));
 
    }
    const data = await service.encode(longUrl);
    res.json({
      shortUrl: `${req.protocol}://${req.get('host')}/${data.shortCode}`,
      ...data,
    });
  } catch (error) {
    next(error);
  }
};


export const decodeUrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { shortCode } = req.body;
    if (!shortCode) {
        return next(createError('shortCode is required', 400));
    }
    const longUrl = await service.decode(shortCode);
    if (!longUrl) {
     
      return next(createError('URL not found', 400));
    }
    res.json({ longUrl });
  } catch (error) {
    next(error);
  }
};


export const getStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { urlPath } = req.params;
    const stats = await service.getStats(urlPath);
    if (!stats) {
        return next(createError('URL not found', 400));

    }
    res.json(stats);
  } catch (error) {
    next(error);
  }
};


export const listUrls = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const urls = await service.listUrls();
    res.json(urls);
  } catch (error) {
    next(error);
  }
};


export const searchUrls = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { q } = req.query;
    if (!q || typeof q !== 'string' || q.length < 3) {
     return next(createError('Query must be at least 3 characters', 400));
   
    }
    const results = await service.searchUrls(q);
    res.json(results);
  } catch (error) {
    next(error);
  }
};


export const redirectToLongUrl = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { shortCode } = req.params;
    const longUrl = await service.handleRedirect(shortCode);
    if (!longUrl) {
     
      return next(createError('Not found', 404));
    }
    res.redirect(longUrl);
  } catch (error) {
    next(error);
  }
};