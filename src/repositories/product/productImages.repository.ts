import { PrismaClientKnownRequestError } from '../../../generated/prisma/runtime/library';
import cloudinary from '../../lib/cloudinary';
import { prisma } from '../../lib/prisma';

class ProductImagesRepository {
  async uploadImage(data: Express.Multer.File, productId: number) {
    const image = await prisma.productImages.create({
      data: {
        url: data.path,
        publicId: data.filename,
        productId,
      },
    });

    return image;
  }

  async getImage(id: number, productId: number) {
    const image = await prisma.productImages.findUnique({
      where: { id, productId },
    });
    return image;
  }

  async getAllImages(productId: number) {
    const images = await prisma.productImages.findMany({
      where: { productId },
    });
    return images;
  }

  async deleteImage(id: number, productId: number) {
    const image = await this.getImage(id, productId);
    if (image) await cloudinary.uploader.destroy(image.publicId);
    await prisma.productImages.delete({ where: { id, productId } });
    return;
  }

  async deleteAllImages(productId: number) {
    const images = await this.getAllImages(productId);

    for (let image of images) {
      await cloudinary.uploader.destroy(image.publicId);
    }

    const result = await prisma.productImages.deleteMany({
      where: { productId },
    });

    if (result.count === 0) {
      const error = new Error('Imagens não encontradas');
      throw error;
    }

    return;
  }
}

export default new ProductImagesRepository();
