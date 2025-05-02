
import { Router } from 'express';
import urlRoutes from './url.routes';
import { redirectToLongUrl } from '../controllers/url.controller';
import { APP } from '../config/env.config';

const router = Router();

// Define the API routes
router.use(APP.ApiV1, urlRoutes);

// Redirect to long URL based on short code
router.get('/:shortCode', redirectToLongUrl);

export default router;