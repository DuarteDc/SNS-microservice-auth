import { Router } from 'express';
import authRouter from './v1/auth.routes';


export const apiRouter = (): Router => {

    const mainApiRouter = Router();

    mainApiRouter.use(authRouter)

    return mainApiRouter;
}