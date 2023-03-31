import express from 'express';
import kwizz from './routes/kwizz';
import question from './routes/question';
import answer from './routes/answer';
import user from './routes/user';
import record from './routes/record';



const router = express.Router(); 


router.use('/kwizz', kwizz); 
router.use('/question', question);
router.use('/answer', answer);
router.use('/user', user);
router.use('/record', record);



export default router;