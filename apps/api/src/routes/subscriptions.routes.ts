import { Router } from 'express';
import { subscriptionsController } from '../controllers/subscriptions.controller';
import { requireAuth } from '../middleware/auth.middleware';
import { syncUser } from '../middleware/syncUser.middleware';

const router = Router();
const auth = [requireAuth, syncUser];

router.get('/', auth, subscriptionsController.getAll);
router.post('/', auth, subscriptionsController.create);
router.put('/:id', auth, subscriptionsController.update);
router.patch('/:id/toggle', auth, subscriptionsController.toggle);
router.delete('/:id', auth, subscriptionsController.delete);

export const subscriptionsRoutes = router;
