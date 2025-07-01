import productImageRepository from '../../repositories/product/productImages.repository';

class ProductImagesService {
  async uploadImage(data: Express.Multer.File, productId: number) {
    return await productImageRepository.uploadImage(data, productId);
  }

  async getImage(id: number, productId: number) {
    return await productImageRepository.getImage(id, productId);
  }

  async getAllImages(productId: number) {
    return await productImageRepository.getAllImages(productId);
  }

  async deleteImage(id: number, productId: number) {
    return await productImageRepository.deleteImage(id, productId);
  }
  async deleteAllImages(productId: number) {
    return await productImageRepository.deleteAllImages(productId);
  }
}

export default new ProductImagesService();
