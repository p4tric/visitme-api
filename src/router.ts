import Express from 'express';
import HealthcheckController from './controllers/HealthcheckController';
import RegisterController from './controllers/RegisterController';
import ReportController from './controllers/ReportController';

const router = Express.Router();

router.use('/', HealthcheckController);
router.use('/', RegisterController);
router.use('/', ReportController);

export default router;
