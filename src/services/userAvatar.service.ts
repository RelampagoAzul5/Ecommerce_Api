import userAvatarRepository from '../repositories/userAvatar.repository';

class UserAvatarService {
  async uploadAvatar(data: Express.Multer.File, userId: number) {
    return await userAvatarRepository.uploadAvatar(data, userId);
  }

  async getAvatar(id: number) {
    return await userAvatarRepository.getAvatar(id);
  }

  async deleteAvatar(userId: number) {
    return await userAvatarRepository.deleteAvatar(userId);
  }
}

export default new UserAvatarService();
