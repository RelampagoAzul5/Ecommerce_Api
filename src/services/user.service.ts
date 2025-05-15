import userRepository from '../repositories/user.repository';
import { CreateUserDTO, UserUpdateDTO } from '../interfaces/user.interface';

class UserService {
  async createUser(data: CreateUserDTO) {
    return await userRepository.createUser(data);
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
