import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { Auth } from './decorators/auth.decorator';
import { CurrentUser } from './decorators/current-user.decorators';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

@Controller()
@UseInterceptors(CurrentUserInterceptor)
export class AppController {
  @Get('/morning')
  @Auth('ADMIN')
  goodMorning(@CurrentUser('email') email: string) {
    return 'Good Morning!' + email;
  }

  @Get('/afternoon')
  @Auth('DEVELOPER')
  goodAfternoon() {
    return 'Good Afternoon!';
  }

  @Get('/evening')
  goodEvening() {
    return 'Good Evening!';
  }
}
