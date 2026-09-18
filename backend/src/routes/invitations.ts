import { Router } from 'express';
import { createInvitation, getInvitation, updateInvitation, deleteInvitation } from '../controllers/invitation.controller';

const router = Router();

router.post('/', createInvitation);
router.get('/:slug', getInvitation);
router.put('/:slug', updateInvitation);
router.delete('/:slug', deleteInvitation);

export default router;
