import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
@Schema({
  timestamps: true,
})
export class Book {
  @Prop()
  title: string;
  @Prop()
  author: string;
  @Prop()
  price: number;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}
export const BookSchema = SchemaFactory.createForClass(Book);
