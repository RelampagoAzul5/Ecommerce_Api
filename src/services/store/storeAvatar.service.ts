import storeAvatarRepository from '../../repositories/store/storeAvatar.repository';

class StoreAvatarService {
  async uploadAvatar(data: Express.Multer.File, storeId: number) {
    return await storeAvatarRepository.uploadAvatar(data, storeId);
  }

  async getAvatar(id: number) {
    return await storeAvatarRepository.getAvatar(id);
  }

  async deleteAvatar(storeId: number) {
    return await storeAvatarRepository.deleteAvatar(storeId);
  }
}

export default new StoreAvatarService();
