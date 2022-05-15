import { Controller, Get } from '@nestjs/common';
import { Auth } from './decorators/auth.decorator';
import { CurrentUser } from './decorators/current-user.decorators';

@Controller()
export class AppController {
  @Get('/morning')
  @Auth('SUPER_ADMIN')
  goodMorning(@CurrentUser('uid') uid: string) {
    return 'Good Morning!' + uid;
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
