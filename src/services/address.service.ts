import {
  AddressUpdateDTO,
  CreateAddressDTO,
} from '@/interfaces/address.interface';
import addressRepository from '../repositories/address.repository';
import userRepository from '../repositories/user.repository';

class AddressService {
  async createAddress(data: CreateAddressDTO, userId: number) {
    const userAdressesCount = await addressRepository.countAdresses(userId);
    const isDefault = userAdressesCount === 0;
    const address = await addressRepository.createAddress(data, userId);
    if (isDefault) {
      await userRepository.updateUser(
        { principalAddressId: address.id },
        userId,
      );
    }
    return address;
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
