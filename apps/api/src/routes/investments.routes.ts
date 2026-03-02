import { Router } from 'express';
import { investmentsController } from '../controllers/investments.controller';
import { requireAuth } from '../middleware/auth.middleware';
import { syncUser } from '../middleware/syncUser.middleware';

const router = Router();
const auth = [requireAuth, syncUser];

router.get('/', auth, investmentsController.getAll);
router.get('/summary', auth, investmentsController.getSummary);
router.get('/:id', auth, investmentsController.getOne);
router.post('/', auth, investmentsController.create);
router.put('/:id', auth, investmentsController.update);
router.delete('/:id', auth, investmentsController.delete);

export const investmentsRoutes = router;
