import { Router } from 'express';
import { getTributes, getTributeBySlug } from '../controllers/tribute.controller.js';

const router = Router();

router.get('/tributes', getTributes);
router.get('/tributes/:slug', getTributeBySlug);

export default router;