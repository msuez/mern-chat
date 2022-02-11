
import { Router } from 'express';

import {
    getChat
} from '../controllers/messages.controller';

import { validateJWT } from '../middlewares/auth.middleware';

const router = Router();

router.get('/:from', [
    validateJWT
], getChat);

export default router;
