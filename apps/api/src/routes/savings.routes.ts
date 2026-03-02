import { Router } from 'express';
import { savingsController } from '../controllers/savings.controller';
import { requireAuth } from '../middleware/auth.middleware';
import { syncUser } from '../middleware/syncUser.middleware';

const router = Router();
const auth = [requireAuth, syncUser];

router.get('/', auth, savingsController.getAll);
router.get('/:id', auth, savingsController.getOne);
router.post('/', auth, savingsController.create);
router.put('/:id', auth, savingsController.update);
router.delete('/:id', auth, savingsController.delete);

export const savingsRoutes = router;
