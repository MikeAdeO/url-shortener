import { Router } from 'express';
import {
  encodeUrl,
  decodeUrl,
  getStats,
  listUrls,
  searchUrls,
  redirectToLongUrl,
} from '../controllers/url.controller';

const router = Router();

router.post('/encode', encodeUrl);
router.post('/decode', decodeUrl);
router.get('/statistic/:urlPath', getStats);
router.get('/list', listUrls);
router.get('/search', searchUrls);
router.get('/:shortCode', redirectToLongUrl);

export default router;
