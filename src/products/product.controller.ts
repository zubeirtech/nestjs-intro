import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { ProductService } from './product.service';
import { Product } from './product.model';

interface PostBody {
  title: string;
  description: string;
  price: number;
}

interface PatchBody {
  title?: string;
  description?: string;
  price?: number;
}

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async addProduct(@Body() body: PostBody) {
    const { title, description, price } = body;
    const product = await this.productService.insertProduct(
      title,
      description,
      price,
    );
    return product;
  }

  @Get()
  getAllProducts(): Product[] {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string): Product {
    return this.productService.getSingleProduct(prodId);
  }

  @Patch(':id')
  updateProduct(@Param('id') prodId: string, @Body() body: PatchBody): void {
    const { title, description, price } = body;
    this.productService.updateProduct(prodId, title, description, price);
    return null;
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string): void {
    this.productService.deleteProduct(id);
    return null;
  }
}
