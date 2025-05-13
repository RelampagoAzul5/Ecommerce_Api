import { prisma } from '../lib/prisma';
import { CreateUserDTO, UserUpdateDTO } from '../interfaces/user.interface';

export async function createUser(data: CreateUserDTO) {
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

export async function getUser(id: number) {
  const user = await prisma.user.findUnique({ where: { id } });
  return user;
}

export async function deleteUser(id: number) {
  const user = await prisma.user.delete({ where: { id } });
  return;
}

export async function updateUser(data: UserUpdateDTO, id: number) {
  const user = await prisma.user.update({
    where: { id },
    data: {
      ...data,
    },
  });
  return user;
}
