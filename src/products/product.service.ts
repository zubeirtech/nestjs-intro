import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  insertProduct(product: Product) {
    this.products.push(product);
  }

  getAllProducts(): Product[] {
    // Return a copy from products list
    return [...this.products];
  }

  getSingleProduct(id: string): Product {
    const product = this.products.find(prod => prod.id === id);
    if (product) {
      return { ...product };
    } else {
      throw new NotFoundException('Product not found');
    }
  }
}
