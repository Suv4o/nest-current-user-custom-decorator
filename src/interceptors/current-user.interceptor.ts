import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { FirebaseAdmin } from '../../config/firebase.setup';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private readonly admin: FirebaseAdmin) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const app = this.admin.setup();
    const request = context.switchToHttp().getRequest();
    const idToken = context.getArgs()[0]?.headers?.authorization.split(' ')[1];

    try {
      const decodedToken = await app.auth().verifyIdToken(idToken);
      const user = await app.auth().getUser(decodedToken.uid);
      request.currentUser = user;
    } catch (error) {
      console.log('Error', error);
      throw new BadRequestException();
    }
    return handler.handle();
  }
}
