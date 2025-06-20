import userRepository from '../../repositories/user/user.repository';
import {
  CreateUserDTO,
  GetUserDTO,
  UserUpdateDTO,
} from '../../interfaces/user.interface';
import userAvatarRepository from '../../repositories/user/userAvatar.repository';

class UserService {
  async createUser(
    data: CreateUserDTO,
    file: Express.Multer.File,
  ): Promise<GetUserDTO | undefined> {
    const user = await userRepository.createUser(data);
    if (!user) return;

    const { name, cpf, bornDate, avatarId, principalAddressId, cartId } = user;

    if (file) {
      const avatar = await userAvatarRepository.uploadAvatar(file, user.id);
      user.avatarId = avatar.id;
    }

    return {
      name,
      cpf,
      bornDate,
      avatarId,
      principalAddressId,
      cartId,
    };
  }

  async getUser(id: number): Promise<GetUserDTO | undefined> {
    const user = await userRepository.getUser(id);
    if (!user) return;

    const { name, cpf, bornDate, avatarId, principalAddressId, cartId } = user;

    return {
      name,
      cpf,
      bornDate,
      avatarId,
      principalAddressId,
      cartId,
    };
  }

  async deleteUser(id: number) {
    return userRepository.deleteUser(id);
  }

  async updateUser(
    data: UserUpdateDTO,
    id: number,
  ): Promise<GetUserDTO | undefined> {
    const newUser: UserUpdateDTO = {};
    if (data.name) newUser.name = data.name;
    if (data.email) newUser.email = data.email;
    if (data.bornDate) newUser.bornDate = data.bornDate;
    if (data.avatarId) newUser.avatarId = data.avatarId;
    if (data.password) newUser.password = data.password;
    if (data.principalAddressId)
      newUser.principalAddressId = data.principalAddressId;

    const user = await userRepository.updateUser(newUser, id);
    if (!user) return;

    const { name, cpf, bornDate, avatarId, principalAddressId, cartId } = user;

    return {
      name,
      cpf,
      bornDate,
      avatarId,
      principalAddressId,
      cartId,
    };
  }
}

export default new UserService();
