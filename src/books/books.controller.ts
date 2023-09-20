import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/createBook.dto';
import { Book } from './schemas/book.schema';
import { updateBookDto } from './dto/updateBook.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}
  @Get()
  async getAllBooks(
    @Query('keyword') keyword: string,
    @Query('page') page: number,
    @Query('sortBy') sortBy: string,
    @Query('minPrice') minPrice: number,
    @Query('sortOrder') sortOrder: string | number,
  ): Promise<Book[]> {
    console.log(keyword);
    return this.bookService.findAll(keyword, page, sortBy, minPrice, sortOrder);
  }
  @Get(':id')
  async getBook(@Param('id') id: string): Promise<Book> {
    return this.bookService.findById(id);
  }
  @Post()
  @UseGuards(AuthGuard())
  async createBook(@Body() book: CreateBookDto, @Req() req): Promise<Book> {
    return this.bookService.create(book, req.user);
  }
  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() book: updateBookDto,
  ): Promise<Book> {
    return this.bookService.updateById(id, book);
  }
  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<Book> {
    return this.bookService.deleteById(id);
  }
}
