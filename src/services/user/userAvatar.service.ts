import userRepository from '../../repositories/user/user.repository';
import userAvatarRepository from '../../repositories/user/userAvatar.repository';

class UserAvatarService {
  async uploadAvatar(data: Express.Multer.File, userId: number) {
    return await userAvatarRepository.uploadAvatar(data, userId);
  }

  async getAvatar(id: number) {
    return await userAvatarRepository.getAvatar(id);
  }

  async deleteAvatar(userId: number) {
    await userRepository.updateUser({ avatarId: null }, userId);
    return await userAvatarRepository.deleteAvatar(userId);
  }
}

export default new UserAvatarService();
