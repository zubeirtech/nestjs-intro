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

  updateProduct(productId: string, title: string, desc: string, price: number) {
    const [product, index] = this.findProduct(productId);
    const updateProduct = { ...product };
    if (title) {
      updateProduct.title = title;
    }
    if (desc) {
      updateProduct.description = desc;
    }
    if (price) {
      updateProduct.price = price;
    }
    this.products[index] = updateProduct;
  }

  deleteProduct(id: string) {
    const index = this.findProduct(id)[1];
    this.products.splice(index, 1);
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex(prod => prod.id === id);
    const product = this.products[productIndex];
    if (product) {
      return [product, productIndex];
    } else {
      throw new NotFoundException('Product not found');
    }
  }
}
