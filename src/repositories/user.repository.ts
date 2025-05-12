import { prisma } from '../lib/prisma';
import { CreateUserDTO } from '../interfaces/user.interface';

export async function createUser(data: CreateUserDTO) {
  // apenas pra exemplo
  const cart = await prisma.cart.create({
    data: {},
  });

  // apenas pra exemplo
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

  // apenas pra exemplo
  const principalAddress = await prisma.addresses.create({
    data: {
      userId: user.id,
      cep: '12345-678',
      road: 'Rua Exemplo',
      number: '123',
      complement: 'Apartamento 45',
      neighborhood: 'Bairro Exemplo',
      city: 'Cidade Exemplo',
      state: 'EX',
      country: 'Brasil',
      type: 'Residencial',
      reference: 'Perto da praça central',
    },
  });
  await prisma.user.update({
    where: { id: user.id },
    data: { principalAddressId: principalAddress.id },
  });

  return user;
}
