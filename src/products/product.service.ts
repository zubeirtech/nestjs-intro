import { Injectable } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  products: Product[] = [];

  insertProduct(product: Product) {
    this.products.push(product);
  }
}
