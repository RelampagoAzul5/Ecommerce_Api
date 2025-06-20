import productRepository from '../../repositories/product/product.repository';
import {
  CreateProductDTO,
  UpdateProductDTO,
  GetProductDTO,
} from '../../interfaces/product.interface';
import storeRepository from '../../repositories/store/store.repository';

class storeService {
  async createProduct(
    data: CreateProductDTO,
    file: Express.Multer.File,
    userIdFromToken: number,
  ): Promise<GetProductDTO | undefined> {
    const store = await storeRepository.getUserStore(userIdFromToken);
    if (!store) return;
    const product = await productRepository.createProduct(data, store.id);
    if (!product) return;

    const { name, price, description, purchasedTimes } = product;

    if (file) {
      // const images = await storeAvatarRepository.uploadAvatar(file, product.id);
    }
    return {
      name,
      price,
      description,
      purchasedTimes,
    };
  }

  async getProduct(id: number): Promise<GetProductDTO | undefined> {
    const product = await productRepository.getProduct(id);
    if (!product) return;

    const { name, price, description, purchasedTimes } = product;

    return {
      name,
      price,
      description,
      purchasedTimes,
    };
  }

  async deleteProduct(storeId: number, productId: number) {
    return await productRepository.deleteProduct(productId, storeId);
  }

  async updateProduct(
    data: UpdateProductDTO,
    id: number,
    storeId: number,
  ): Promise<GetProductDTO | undefined> {
    const product = await productRepository.updateProduct(data, id, storeId);
    if (!product) return;

    const { name, price, description, purchasedTimes } = product;

    return {
      name,
      price,
      description,
      purchasedTimes,
    };
  }
}

export default new storeService();
