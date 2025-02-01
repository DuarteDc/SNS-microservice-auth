import { Router } from 'express';

const authRouter = Router()


authRouter.get('/auth', () => {
    console.log('main')
})

export default authRouter;