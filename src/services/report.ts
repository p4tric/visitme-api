import { Request, Response } from 'express';
import { InviteVsers, Vsers } from '../models/index';

/*
export const generateWorkload = async (req: Request, res: Response) => {
  let workloadBody = {} as any;
  const teachers = await Teacher.findAll();

  await Promise.all(teachers.map(async (teacher: any) => {
    const subjects = await teacher.getSubjects();

    workloadBody[teacher.name] = await Promise.all(subjects
      .map(async (subject: any) => {

      const classes = await subject.getClaszs();

      return {
        subjectCode: subject.subjectCode,
        subjectName: subject.name,
        numberOfClasses: classes.length,
      };

    }));
  }));

  return workloadBody;
};
*/
