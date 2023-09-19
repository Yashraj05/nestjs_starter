import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/createBook.dto';
import { Book } from './schemas/book.schema';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}
  @Get()
  getAllBooks(): Promise<Book[]> {
    return this.bookService.findAll();
  }
  @Get(':id')
  getBook(@Param('id') id: string): Promise<Book> {
    return this.bookService.findById(id);
  }
  @Post()
  createBook(@Body() book: CreateBookDto): Promise<Book> {
    return this.bookService.create(book);
  }
  @Put(':id')
  updateBook(@Param('id') id: string, book: CreateBookDto): Promise<Book> {
    return this.bookService.updateById(id, book);
  }
  @Delete(':id')
  deleteBook(@Param('id') id: string): Promise<Book> {
    return this.bookService.deleteById(id);
  }
}
