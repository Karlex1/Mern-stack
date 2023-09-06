import { Router } from "express";
import passport from "passport";
import * as UserController from'../Controller/UserController.js'

const router = Router();

router.get(
    "/",passport.authenticate('jwt', { session: false }), UserController.user
);

export default router;