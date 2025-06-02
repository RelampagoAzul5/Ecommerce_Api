import storeRepository from '../repositories/store.repository';
import {
  CreateStoreDTO,
  GetStoreDTO,
  StoreUpdateDTO,
} from '../interfaces/store.interface';
import storeAvatarRepository from '../repositories/storeAvatar.repository';

class storeService {
  async createStore(
    data: CreateStoreDTO,
    file: Express.Multer.File,
    userId: number,
  ): Promise<GetStoreDTO | undefined> {
    const store = await storeRepository.createStore(data, userId);
    if (!store) return;

    const { name, avatarId } = store;

    if (file) {
      const avatar = await storeAvatarRepository.uploadAvatar(file, store.id);
      store.avatarId = avatar.id;
    }

    return {
      name,
      avatarId,
    };
  }

  async getStore(id: number): Promise<GetStoreDTO | undefined> {
    const store = await storeRepository.getStore(id);
    if (!store) return;

    const { name, avatarId } = store;

    return {
      name,
      avatarId,
    };
  }

  async deleteStore(id: number) {
    return storeRepository.deleteStore(id);
  }

  async updateStore(
    data: StoreUpdateDTO,
    id: number,
  ): Promise<GetStoreDTO | undefined> {
    const store = await storeRepository.updateStore(data, id);
    if (!store) return;

    const { name, avatarId } = store;

    return {
      name,
      avatarId,
    };
  }
}

export default new storeService();
