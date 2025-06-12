import cloudinary from '../lib/cloudinary';
import { prisma } from '../lib/prisma';

class StoreAvatarRepository {
  async uploadAvatar(data: Express.Multer.File, storeId: number) {
    const store = await prisma.stores.findUnique({
      where: { id: storeId },
      include: { avatar: true },
    });

    if (store?.avatar) {
      await cloudinary.uploader.destroy(store.avatar.publicId);
      await prisma.avatarStore.delete({
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

  async getAvatar(storeId: number) {
    const avatar = await prisma.avatarStore.findUnique({
      where: { id: storeId },
    });
    return avatar;
  }

  async deleteAvatar(storeId: number) {
    await prisma.avatarStore.delete({ where: { id: storeId } });
    return;
  }
}

export default new StoreAvatarRepository();
