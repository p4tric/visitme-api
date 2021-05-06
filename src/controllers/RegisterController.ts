import Express, { RequestHandler } from 'express';
import { OK, BAD_REQUEST, NO_CONTENT } from 'http-status-codes';

import { register } from '../services/index';

import { APP_VERSION } from '../config/common';

const RegisterController = Express.Router();

const registerHandler: RequestHandler = async (req, res) => {
  const { data, message } = await register.registerPayload(req, res);
  console.log('[SERVICE registerPayload] ', data, message);

  return res.json({
    status: OK,
    version: APP_VERSION,
    data,
    message
  });
}

RegisterController.post('/register', registerHandler);

export default RegisterController;
