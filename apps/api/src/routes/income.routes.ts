import { Router } from 'express';
import { incomeController } from '../controllers/income.controller';
import { requireAuth } from '../middleware/auth.middleware';
import { syncUser } from '../middleware/syncUser.middleware';

const router = Router();
const auth = [requireAuth, syncUser];

router.get('/', auth, incomeController.getAll);
router.get('/:year/:month', auth, incomeController.getByMonth);
router.post('/', auth, incomeController.upsert);
router.delete('/:id', auth, incomeController.delete);

export const incomeRoutes = router;
