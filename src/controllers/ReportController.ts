import Express, { RequestHandler } from 'express';
import { BAD_REQUEST, OK } from 'http-status-codes';

import { report } from '../services/index';

import { InviteVsers, Vsers } from '../models/index';

import { APP_VERSION } from '../config/common';

const ReportController = Express.Router();

const reportHandler: RequestHandler = async (req, res) => {
  /*
  const workloadBody = await report.generateWorkload(req, res);

  if (!workloadBody) {
    return res.json({
      status: BAD_REQUEST,
      version: APP_VERSION,
      message: 'No records.'
    });
  }
  */

  return res.json({
    status: OK,
    version: APP_VERSION,
    data: [],
  });

}

ReportController.get('/reports/workload', reportHandler);

export default ReportController;
