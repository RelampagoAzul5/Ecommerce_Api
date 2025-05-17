import cloudinary from '../lib/cloudinary';
import { prisma } from '../lib/prisma';

class UserAvatarRepository {
  async uploadAvatar(data: Express.Multer.File, userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { avatar: true },
    });

    if (user?.avatar) {
      await cloudinary.uploader.destroy(user.avatar.publicId);
      await prisma.avatarUser.delete({
        where: { id: user.avatar.id },
      });
    }
    const avatar = await prisma.avatarUser.create({
      data: {
        url: data.path,
        publicId: data.filename,
        userId,
      },
    });

    await prisma.user.update({
      where: { id: userId },
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

export default new UserAvatarRepository();
