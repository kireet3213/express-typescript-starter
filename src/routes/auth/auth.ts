import { Router } from 'express';
import passport from 'passport';

const authRoutes = Router();

authRoutes.post(
    '/login',
    passport.authenticate('local', { failureMessage: true, session: false }),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (req, res, next) => {
        res.status(200).json({ success: true });
    }
);

export default authRoutes;
