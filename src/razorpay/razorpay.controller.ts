import { Body, Controller, Get, Post } from '@nestjs/common';
import { RazorpayService } from './razorpay.service';
import { OrderDto } from './dto/order.dto';
import { VerifyDto } from './dto/verigy.dto';

@Controller('razorpay')
export class RazorpayController {
  constructor(private razorpayService: RazorpayService) {}
  @Post()
  async createOrder(@Body() orderDto: OrderDto) {
    const order = await this.razorpayService.createOrder(orderDto);
    console.log(process.env.RAZORPAY_API_KEY);
    return order;
  }
  @Get('/getKey')
  async getKey() {
    return process.env.RAZORPAY_API_KEY;
  }
  @Post('/verify')
  async verifyOrder(@Body() verifyDto: VerifyDto) {
    return this.razorpayService.verifyOrder(verifyDto);
  }
}
