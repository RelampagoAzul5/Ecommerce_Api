import userRepository from '../repositories/user.repository';
import { CreateUserDTO, UserUpdateDTO } from '../interfaces/user.interface';
import userAvatarRepository from '../repositories/userAvatar.repository';

class UserService {
  async createUser(data: CreateUserDTO, file: Express.Multer.File) {
    const user = await userRepository.createUser(data);
    if (file) {
      const avatar = await userAvatarRepository.uploadAvatar(file, user.id);
      user.avatarId = avatar.id;
    }
    return user;
  }

  async getUser(id: number) {
    return userRepository.getUser(id);
  }

  async deleteUser(id: number) {
    return userRepository.deleteUser(id);
  }

  async updateUser(data: UserUpdateDTO, id: number) {
    return userRepository.updateUser(data, id);
  }
}

export default new UserService();
