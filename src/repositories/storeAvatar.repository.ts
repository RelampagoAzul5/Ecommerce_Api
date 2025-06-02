import cloudinary from '../lib/cloudinary';
import { prisma } from '../lib/prisma';

class Store {
  async uploadAvatar(data: Express.Multer.File, storeId: number) {
    const store = await prisma.stores.findUnique({
      where: { id: storeId },
      include: { avatar: true },
    });

    if (store?.avatar) {
      await cloudinary.uploader.destroy(store.avatar.publicId);
      await prisma.avatarUser.delete({
        where: { id: store.avatar.id },
      });
    }
    const avatar = await prisma.avatarStore.create({
      data: {
        url: data.path,
        publicId: data.filename,
        storeId,
      },
    });

    await prisma.user.update({
      where: { id: storeId },
      data: {
        avatarId: avatar.id,
      },
    });
    return avatar;
  }

  async getAvatar(userId: number) {
    const avatar = await prisma.avatarUser.findUnique({ where: { userId } });
    return avatar;
  }

  async deleteAvatar(userId: number) {
    await prisma.avatarUser.delete({ where: { userId } });
    return;
  }
}

export default new Store();
