import { Router } from 'express';
import { expensesController } from '../controllers/expenses.controller';
import { requireAuth } from '../middleware/auth.middleware';
import { syncUser } from '../middleware/syncUser.middleware';

const router = Router();
const auth = [requireAuth, syncUser];

router.get('/', auth, expensesController.getAll);
router.get('/summary', auth, expensesController.getSummary);
router.get('/:id', auth, expensesController.getOne);
router.post('/', auth, expensesController.create);
router.put('/:id', auth, expensesController.update);
router.delete('/:id', auth, expensesController.delete);

export const expensesRoutes = router;
