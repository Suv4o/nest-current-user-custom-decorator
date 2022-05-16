import { Module } from '@nestjs/common';
import { FirebaseAdmin } from 'config/firebase.setup';
import { CurrentUserInterceptor } from '../interceptors/current-user.interceptor';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, FirebaseAdmin, CurrentUserInterceptor],
})
export class UserModule {}
