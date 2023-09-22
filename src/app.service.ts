import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log(process.env.RAZORPAY_API_KEY);
    return 'Hello World!';
  }
}
