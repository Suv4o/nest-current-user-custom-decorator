import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import * as adminTypes from 'firebase-admin';
import { FirebaseAdmin } from '../../config/firebase.setup';
const admin = new FirebaseAdmin();

type UserRecord = keyof adminTypes.auth.UserRecord;

export const CurrentUser = createParamDecorator(
  async (data: UserRecord, context: ExecutionContext) => {
    const app = admin.setup();

    const idToken = context.getArgs()[0]?.headers?.authorization.split(' ')[1];

    try {
      const decodedToken = await app.auth().verifyIdToken(idToken);
      const user = await app.auth().getUser(decodedToken.uid);
      return data ? user?.[data] : user;
    } catch (error) {
      console.log('Error', error);
      throw new BadRequestException();
    }
  },
);
