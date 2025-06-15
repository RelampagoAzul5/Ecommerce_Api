import storeRepository from '../../repositories/store/store.repository';
import {
  CreateStoreDTO,
  GetStoreDTO,
  StoreUpdateDTO,
} from '../../interfaces/store.interface';
import storeAvatarRepository from '../../repositories/store/storeAvatar.repository';

class storeService {
  async createStore(
    data: CreateStoreDTO,
    file: Express.Multer.File,
    userId: number,
  ): Promise<GetStoreDTO | undefined> {
    const store = await storeRepository.createStore(data, userId);
    if (!store) return;

    const { name, avatarId, credentialType, crendential } = store;

    if (file) {
      const avatar = await storeAvatarRepository.uploadAvatar(file, store.id);
      store.avatarId = avatar.id;
    }

    return {
      userId,
      name,
      avatarId,
      credential: crendential,
      credentialType,
    };
  }

  async getStore(id: number): Promise<GetStoreDTO | undefined> {
    const store = await storeRepository.getStore(id);
    if (!store) return;

    const { userId, name, avatarId, credentialType, crendential } = store;

    return {
      userId,
      name,
      avatarId,
      credential: crendential,
      credentialType,
    };
  }

  async deleteStore(userId: number) {
    return storeRepository.deleteStore(userId);
  }

  async updateStore(
    data: StoreUpdateDTO,
    userId: number,
  ): Promise<GetStoreDTO | undefined> {
    const store = await storeRepository.updateStore(data, userId);
    if (!store) return;

    const { name, avatarId, credentialType, crendential } = store;

    return {
      userId,
      name,
      avatarId,
      credential: crendential,
      credentialType,
    };
  }
}

export default new storeService();
