import { prisma } from '../lib/prisma';
import {
  AddressUpdateDTO,
  CreateAddressDTO,
} from '@/interfaces/address.interface';

class AddressRepository {
  async createAddress(data: CreateAddressDTO, userId: number) {
    const address = await prisma.addresses.create({
      data: {
        userId,
        ...data,
      },
    });

    return address;
  }

  async getAddress(userId: number) {
    const addresses = await prisma.addresses.findMany({ where: { userId } });
    return addresses;
  }

  async deleteAddress(addresId: number, userId: number) {
    await prisma.addresses.delete({ where: { id: addresId, userId } });
    return;
  }

  async updateAddress(
    data: AddressUpdateDTO,
    addresId: number,
    userId: number,
  ) {
    const address = await prisma.addresses.update({
      where: { id: addresId, userId },
      data: {
        ...data,
      },
    });
    return address;
  }
}

export default new AddressRepository();
