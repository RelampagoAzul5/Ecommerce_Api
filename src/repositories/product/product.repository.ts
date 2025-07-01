import { prisma } from '../../lib/prisma';
import {
  CreateProductDTO,
  UpdateProductDTO,
} from '../../interfaces/product.interface';

class ProductRepository {
  async createProduct(data: CreateProductDTO, storeId: number) {
    return await prisma.products.create({
      data: {
        name: data.name,
        price: data.price,
        description: data.description,
        purchasedTimes: 0,
        storeId,
      },
    });
  }

  async getProduct(id: number) {
    const product = await prisma.products.findUnique({ where: { id } });
    return product;
  }

  async getAllStoreProducts(storeId: number) {
    const product = await prisma.products.findMany({ where: { storeId } });
    return product;
  }

  async deleteProduct(id: number, storeId: number) {
    return await prisma.products.delete({ where: { id, storeId } });
  }

  async updateProduct(data: UpdateProductDTO, id: number, storeId: number) {
    return await prisma.products.update({
      where: { id, storeId },
      data: {
        ...data,
      },
    });
  }
}

export default new ProductRepository();
