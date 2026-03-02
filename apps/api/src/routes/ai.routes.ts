import { Router } from 'express';
import { aiController } from '../controllers/ai.controller';
import { requireAuth } from '../middleware/auth.middleware';
import { syncUser } from '../middleware/syncUser.middleware';
import { aiRateLimiter } from '../middleware/rateLimiter.middleware';

const router = Router();
const auth = [requireAuth, syncUser];

router.post('/analyze', auth, aiRateLimiter, aiController.analyze);
router.get('/history', auth, aiController.getHistory);

export const aiRoutes = router;
