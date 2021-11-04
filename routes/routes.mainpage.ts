import express, { Router } from 'express';
import { mainPageController } from '../controller/controller.mainpage';

const router: Router = express.Router();

router.post('/convert-to-pdf', mainPageController.convertToPdf);

export default router;