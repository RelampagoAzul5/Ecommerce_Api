import {
  AddressUpdateDTO,
  CreateAddressDTO,
  GetAddressDTO,
} from '../../interfaces/address.interface';
import addressRepository from '../../repositories/user/address.repository';
import userRepository from '../../repositories/user/user.repository';

class AddressService {
  async createAddress(
    data: CreateAddressDTO,
    userId: number,
  ): Promise<GetAddressDTO | undefined> {
    const userAdressesCount = await addressRepository.countAdresses(userId);
    const isDefault = userAdressesCount === 0;
    const address = await addressRepository.createAddress(data, userId);
    if (!address) return;

    if (isDefault) {
      await userRepository.updateUser(
        { principalAddressId: address.id },
        userId,
      );
    }

    const {
      cep,
      road,
      number,
      complement,
      neighborhood,
      city,
      state,
      country,
      type,
      reference,
    } = address;

    return {
      cep,
      road,
      number,
      complement,
      neighborhood,
      city,
      state,
      country,
      type,
      reference,
    };
  }

  async getAddresses(id: number): Promise<GetAddressDTO[] | undefined> {
    const addresses = await addressRepository.getAddresses(id);
    if (!addresses) return;
    const formatedAddresses: GetAddressDTO[] = addresses.map((addresses) => ({
      cep: addresses.cep,
      road: addresses.road,
      number: addresses.number,
      complement: addresses.complement,
      neighborhood: addresses.neighborhood,
      city: addresses.city,
      state: addresses.state,
      country: addresses.country,
      type: addresses.type,
      reference: addresses.reference,
    }));
    return formatedAddresses;
  }

  async getAddress(
    userId: number,
    addressId: number,
  ): Promise<GetAddressDTO | undefined> {
    const address = await addressRepository.getAddress(userId, addressId);
    if (!address) return;
    const {
      cep,
      road,
      number,
      complement,
      neighborhood,
      city,
      state,
      country,
      type,
      reference,
    } = address;

    return {
      cep,
      road,
      number,
      complement,
      neighborhood,
      city,
      state,
      country,
      type,
      reference,
    };
  }

  async deleteAddress(addresId: number, userId: number) {
    return await addressRepository.deleteAddress(addresId, userId);
  }

  async updateAddress(
    data: AddressUpdateDTO,
    addresId: number,
    userId: number,
  ) {
    const addresses = await addressRepository.updateAddress(
      data,
      addresId,
      userId,
    );
    if (!addresses) return;
    const {
      cep,
      road,
      number,
      complement,
      neighborhood,
      city,
      state,
      country,
      type,
      reference,
    } = addresses;

    return {
      cep,
      road,
      number,
      complement,
      neighborhood,
      city,
      state,
      country,
      type,
      reference,
    };
  }
}

export default new AddressService();
