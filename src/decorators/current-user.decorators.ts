import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as adminTypes from 'firebase-admin';

type UserRecord = keyof adminTypes.auth.UserRecord;

export const CurrentUser = createParamDecorator(
  (data: UserRecord, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return data ? request.currentUser?.[data] : request.currentUser;
  },
);
