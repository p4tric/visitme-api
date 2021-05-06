import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passwordValidator from 'password-validator';

import { auth } from '../config/common';
import { InviteVsers, Vsers } from '../models/index';

export const findCreateVser = async (params: any) => {
  const { email, phoneNumber } = params;
  const [user, isCreated] = await Vsers.findOrCreate({
    where: { email, phoneNumber },
    defaults: params
  });
  return { user, isCreated };
};

/*
export const findCreateClass = async (params: any) => {
  const [res, isCreated] = await Clasz.findOrCreate({
    where: { classCode: params.classCode },
    defaults: params
  });
  return res;
};

export const findCreateTeacher = async (params: any) => {
  const [res, isCreated] = await Teacher.findOrCreate({
    where: { email: params.email },
    defaults: params
  });
  return res;
};

export const findCreateSubject = async (params: any) => {
  const [res, isCreated] = await Subject.findOrCreate({
    where: { subjectCode: params.subjectCode },
    defaults: params
  });
  return res;
};

export const findCreateClassTeacher = async (params: any) => {
  const [res, isCreated] = await ClassTeacher.findOrCreate({
    where: params,
    defaults: params,
  });
  return res;
};

export const findCreateSubjectTeacher = async (params: any) => {
  const [res, isCreated] = await SubjectTeacher.findOrCreate({
    where: params,
    defaults: params,
  });
  return res;
};

export const findCreateClassSubject = async (params: any) => {
  const [res, isCreated] = await ClassSubject.findOrCreate({
    where: params,
    defaults: params,
  });
  return res;
};

export const findCreateStudent = async (params: any) => {
  const [res, isCreated] = await Student.findOrCreate({
    where: { email: params.email },
    defaults: params,
  });
  return res;
};

export const findCreateClassStudent = async (params: any) => {
  const [res, isCreated] = await ClassStudent.findOrCreate({
    where: params,
    defaults: params,
  });
  return res;
};

*/
export const validatePassword = async (password: any) => {
  // Create a schema
  let schema = new passwordValidator();

  // Add properties to it
  schema
  .is().min(10)                                    // Minimum length 10
  .is().max(10)                                    // Maximum length 10
  .has().digits(1)
  .has().uppercase(1)                               // Must have uppercase letters
  .has().lowercase()                               // Must have lowercase letters
  .has().symbols(1)
  .has().not().spaces()                            // Should not have spaces

  // Get a full list of rules which failed
  console.log(schema.validate(password, { list: true }));
  // => [ 'min', 'uppercase', 'digits' ]

  const gotError = schema.validate(password, { list: true });
  if (gotError.length > 0) {
    let errText = '';
    if (gotError.includes('min')) errText += 'Minimum of 10 characters. ';
    if (gotError.includes('max')) errText += 'Maximum of 10 characters. ';
    if (gotError.includes('digits')) errText += 'At least 1 digit. ';
    if (gotError.includes('uppercase')) errText += 'At least 1 uppercase character. ';
    if (gotError.includes('symbols')) errText += 'At least 1 special character. ';
    if (gotError.includes('spaces')) errText += 'No spaces allowed. ';

    let err = {
      msg: `Password must be: ${errText}`
    };
    return err;
  }
  return undefined;
};

export const hashString = async (password: any) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
  /*
  const match = await bcrypt.compare(password, user.passwordHash);
  if(match) {}
  */
};

export const generateAccessToken = async (user: any) => {
  console.log('[generateAccessToken] ', user);
  return await jwt.sign(
    user,
    auth.accessTokenSecret,
    { expiresIn: auth.accessTokenLife }
  );
}

export const generateRefreshToken = async (user: any) => {
  console.log('[generateRefreshToken] ', user);
  return await jwt.sign(
    user,
    auth.refreshTokenSecret,
    { expiresIn: auth.refreshTokenLife }
  );
}

export const registerPayload = async (req: Request, res: Response) => {
  const { user } = req.body;
  const data = [] as any;
  const vpass = await validatePassword(user.password);
  if (!vpass) {

    // hash password
    const hashedUser = {
      ...user,
      password: await hashString(user.password)
    };

    // create tokens
    const { password, ...peeledUser } = hashedUser;
    const token = await generateAccessToken(peeledUser);
    const refreshToken = await generateRefreshToken(peeledUser);

    const { user: registeredUser, isCreated } = await findCreateVser(hashedUser);
    return {
      data: { token, refreshToken },
      message: isCreated
      ? 'Registration successful.'
      : 'This email/phone already registered.'
    };
  }

  console.log('[VPASS] ', vpass);
  return { data, message: vpass.msg };

  /*


  if (isCreated) {

  }
  const data = {
    token:
  }
  */



  /*
  const { class: clasz, students, subject, teacher } = req.body;

  const registeredClass = await findCreateClass(clasz);
  const registeredTeacher = await findCreateTeacher(teacher);
  const registeredSubject = await findCreateSubject(subject);

  const registeredClassTeacher = await findCreateClassTeacher({
    teacherId: registeredTeacher.id,
    claszId: registeredClass.id
  });

  const registeredSubjectTeacher = await findCreateSubjectTeacher({
    teacherId: registeredTeacher.id,
    subjectId: registeredSubject.id
  });

  const registeredClassSubject = await findCreateClassSubject({
    claszId: registeredClass.id,
    subjectId: registeredSubject.id
  });

  students.map(async (student: any) => {
    const registeredStudent = await findCreateStudent(student);
    const registeredClassStudent = await findCreateClassStudent({
      studentId: registeredStudent.id,
      claszId: registeredClass.id
    });
  });
  */
};
