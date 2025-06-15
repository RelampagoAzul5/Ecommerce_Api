import { prisma } from '../../lib/prisma';
import {
  CreateStoreDTO,
  StoreUpdateDTO,
} from '../../interfaces/store.interface';

class StoreRepository {
  async createStore(data: CreateStoreDTO, userId: number) {
    return await prisma.stores.create({
      data: {
        name: data.name,
        credentialType: data.credentialType,
        crendential: data.credential,
        userId,
      },
    });
  }

  async getStore(id: number) {
    const store = await prisma.stores.findUnique({ where: { id } });
    return store;
  }

  async deleteStore(userId: number) {
    return await prisma.stores.delete({ where: { userId } });
  }

  async updateStore(data: StoreUpdateDTO, userId: number) {
    return await prisma.stores.update({
      where: { userId },
      data: {
        ...data,
      },
    });
  }
}

export default new StoreRepository();
