import express from 'express';
import user from './routes/user';
import message from './routes/message';
import bot from './routes/bot';




const router = express.Router(); 



router.use('/user', user);
router.use('/message', message);
router.use('/bot', bot);



export default router;