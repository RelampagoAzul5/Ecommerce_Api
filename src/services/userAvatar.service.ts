import userAvatarRepository from '../repositories/userAvatar.repository';

class UserAvatarService {
  async uploadAvatar(data: Express.Multer.File, userId: number) {
    return await userAvatarRepository.uploadAvatar(data, userId);
  }

  async getAvatar(id: number) {
    return userAvatarRepository.getAvatar(id);
  }

  async deleteAvatar(id: number) {
    return userAvatarRepository.deleteAvatar(id);
  }
}

export default new UserAvatarService();
