import { Injectable } from '@nestjs/common';
import crypto from 'crypto';
import { OrderDto } from './dto/order.dto';
import Razorpay from 'razorpay';
import { VerifyDto } from './dto/verigy.dto';
@Injectable()
export class RazorpayService {
  private razorpay;

  constructor() {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY, // Use environment variable
      key_secret: process.env.RAZORPAY_API_SECRET, // Use environment variable
    });
  }
  // async createOrder(orderDto: OrderDto) {
  //   const options = {
  //     amount: orderDto.amount * 100,
  //     currency: 'INR',
  //     receipt: 'order_rcptid_' + Date.now(),
  //   };
  //   const order = await this.razorpay.orders.create(options);

  //   return order;
  // }
  async createOrder(orderDto: OrderDto) {
    const currentTimestamp = Math.floor(Date.now() / 1000); // Convert milliseconds to seconds
    const oneDayInSeconds = 86400; // 24 hours * 60 minutes * 60 seconds
    const oneDayFromNow = currentTimestamp + oneDayInSeconds;

    const options = {
      amount: orderDto.amount,
      currency: 'INR',
      transfers: [
        {
          account: process.env.ACCOUNT_ID_1,
          amount: orderDto.amount / 2,
          currency: 'INR',
          on_hold: 0,
        },
        {
          account: process.env.ACCOUNT_ID_2,
          amount: orderDto.amount / 2,
          currency: 'INR',
          on_hold: 1,
          on_hold_until: oneDayFromNow,
        },
      ],
    };

    const order = await this.razorpay.orders.create(options);

    return order;
  }
  async verifyOrder(verifyDto: VerifyDto) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      verifyDto;

    const body = razorpay_order_id + '|' + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      return 'order successfull';
    } else {
      return 'fail';
    }
  }
}
