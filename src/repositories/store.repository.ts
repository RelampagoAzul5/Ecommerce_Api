import { prisma } from '../lib/prisma';
import { CreateStoreDTO, StoreUpdateDTO } from '../interfaces/store.interface';

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

  async deleteStore(id: number) {
    return await prisma.stores.delete({ where: { id } });
  }

  async updateStore(data: StoreUpdateDTO, id: number) {
    return await prisma.stores.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }
}

export default new StoreRepository();
