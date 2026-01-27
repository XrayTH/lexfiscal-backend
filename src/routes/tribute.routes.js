import { Router } from 'express';
import { getTributes } from '../controllers/tribute.controller.js';

const router = Router();

router.get('/tributes', getTributes);

export default router;