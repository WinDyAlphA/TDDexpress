import express from 'express';
import user from './routes/user';
import message from './routes/message';




const router = express.Router(); 



router.use('/user', user);
router.use('/message', message);



export default router;