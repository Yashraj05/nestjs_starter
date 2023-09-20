import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModel: mongoose.Model<Book>,
  ) {}
  async findAll(
    keyword: string,
    page: number,
    sortBy: string,
    minPrice: number,
    sortOrder: string | number,
  ): Promise<Book[]> {
    const resPerPage = 4;
    const currentPage = page || 1;
    const skip = resPerPage * (currentPage - 1);
    const filter = {
      title: {
        $regex: keyword || '',
        $options: 'i',
      },
      price: {
        $gte: minPrice || 0,
      },
    };
    const sort: any = {};
    if (sortBy) {
      sort[sortBy] = sortOrder;
    }
    const books = await this.bookModel
      .find(filter)
      .limit(resPerPage)
      .skip(skip)
      .sort(sort);
    return books;
  }
  async create(book: Book, user: User): Promise<Book> {
    const data = Object.assign(book, { user: user._id });
    const res = await this.bookModel.create(data);

    return res;
  }

  async findById(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id);

    if (!book) {
      throw new NotFoundException('Book not found.');
    }

    return book;
  }

  async updateById(id: string, book: Book): Promise<Book> {
    try {
      console.log(book);
      const updatedBook = await this.bookModel.findByIdAndUpdate(id, book, {
        new: true,
      });
      if (!updatedBook) {
        throw new Error(`Book with ID ${id} not found.`);
      }
      console.log(updatedBook);
      return updatedBook;
    } catch (error) {
      console.error(`Error updating book: ${error.message}`);
      return null;
    }
  }

  async deleteById(id: string): Promise<Book> {
    return await this.bookModel.findByIdAndDelete(id);
  }
}
