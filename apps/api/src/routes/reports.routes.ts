import { Router } from 'express';
import { reportsController } from '../controllers/reports.controller';
import { requireAuth } from '../middleware/auth.middleware';
import { syncUser } from '../middleware/syncUser.middleware';

const router = Router();
const auth = [requireAuth, syncUser];

router.get('/monthly', auth, reportsController.getMonthly);
router.get('/yearly', auth, reportsController.getYearly);

export const reportsRoutes = router;
