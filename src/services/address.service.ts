import {
  AddressUpdateDTO,
  CreateAddressDTO,
} from '@/interfaces/address.interface';
import addressRepository from '../repositories/address.repository';

class AddressService {
  async createAddress(data: CreateAddressDTO, userId: number) {
    return await addressRepository.createAddress(data, userId);
  }

  async getAddress(id: number) {
    return await addressRepository.getAddress(id);
  }

  async deleteAddress(addresId: number, userId: number) {
    return await addressRepository.deleteAddress(addresId, userId);
  }

  async updateAddress(
    data: AddressUpdateDTO,
    addresId: number,
    userId: number,
  ) {
    return await addressRepository.updateAddress(data, addresId, userId);
  }
}

export default new AddressService();
