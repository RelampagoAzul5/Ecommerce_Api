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

    const { id, name, price, description, purchasedTimes } = product;

    if (file) {
      // const images = await storeAvatarRepository.uploadAvatar(file, product.id);
    }
    return {
      id,
      name,
      price,
      description,
      purchasedTimes,
    };
  }

  async getProduct(productId: number): Promise<GetProductDTO | undefined> {
    const product = await productRepository.getProduct(productId);
    if (!product) return;

    const { id, name, price, description, purchasedTimes } = product;

    return {
      id,
      name,
      price,
      description,
      purchasedTimes,
    };
  }

  async getAllStoreProducts(
    storeId: number,
  ): Promise<GetProductDTO[] | undefined> {
    const products = await productRepository.getAllStoreProducts(storeId);
    if (!products) return;
    const productList = [];

    for (let product of products) {
      const { id, name, price, description, purchasedTimes } = product;
      productList.push({
        id,
        name,
        price,
        description,
        purchasedTimes,
      });
    }

    return productList;
  }

  async deleteProduct(storeId: number, productId: number) {
    return await productRepository.deleteProduct(productId, storeId);
  }

  async updateProduct(
    data: UpdateProductDTO,
    productId: number,
    storeId: number,
  ): Promise<GetProductDTO | undefined> {
    const product = await productRepository.updateProduct(
      data,
      productId,
      storeId,
    );
    if (!product) return;

    const { id, name, price, description, purchasedTimes } = product;

    return {
      id,
      name,
      price,
      description,
      purchasedTimes,
    };
  }
}

export default new storeService();
