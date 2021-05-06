import { Request, Response } from 'express';
import { report } from '../index';

describe('Get correct workload content', () => {
  test('returns 200 with correct data structure', async () => {
    let responseObject = {};
    const req = {};
    const res: Partial<Response> = {
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      })
    };

    const expectedResult = {
      "status": 200,
      "version": "0.0.1",
      "data": {
        "Ms. Rempillo": [{
          "subjectCode": "ENG",
          "subjectName": "English",
          "numberOfClasses": 2
        }]
      }
    };

    await report.generateWorkload(req as Request, res as Response);
    expect(responseObject).toEqual(expectedResult);
  });
})
