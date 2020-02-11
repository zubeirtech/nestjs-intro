import { Controller, Post, Body } from '@nestjs/common';

import { ProductService } from './product.service';
import { Product } from './product.model';

interface PostBody {
  title: string;
  description: string;
  price: number;
}

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  addProduct(@Body() body: PostBody): { id: string } {
    const { title, description, price } = body;
    const id = new Date().toString();
    const product = new Product(id, title, description, price);
    this.productService.insertProduct(product);

    return { id };
  }
}
