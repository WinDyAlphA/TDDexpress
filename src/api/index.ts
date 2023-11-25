import express from 'express';
import kwizz from './routes/kwizz';




const router = express.Router(); 


router.use('/kwizz', kwizz);



export default router;