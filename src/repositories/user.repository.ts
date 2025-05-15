import { prisma } from '../lib/prisma';
import { CreateUserDTO, UserUpdateDTO } from '../interfaces/user.interface';

class UserRepository {
  async createUser(data: CreateUserDTO) {
    const cart = await prisma.cart.create({
      data: {},
    });
    const avatar = await prisma.images.create({
      data: {
        url: 'a',
      },
    });

    const user = await prisma.user.create({
      data: {
        name: data.name,
        cpf: data.cpf,
        email: data.email,
        password: data.password,
        bornDate: data.bornDate,
        avatarId: avatar.id,
        cartId: cart.id,
      },
    });

    return user;
  }

  async getUser(id: number) {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  }

  async deleteUser(id: number) {
    const user = await prisma.user.delete({ where: { id } });
    return;
  }

  async updateUser(data: UserUpdateDTO, id: number) {
    const user = await prisma.user.update({
      where: { id },
      data: {
        ...data,
      },
    });
    return user;
  }
}

export default new UserRepository();
