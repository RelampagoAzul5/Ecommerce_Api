import * as userRepository from '../repositories/user.repository';
import { CreateUserDTO, UserUpdateDTO } from '../interfaces/user.interface';

export async function createUser(data: CreateUserDTO) {
  return await userRepository.createUser(data);
}

export async function getUser(id: number) {
  return userRepository.getUser(id);
}

export async function deleteUser(id: number) {
  return userRepository.deleteUser(id);
}

export async function updateUser(data: UserUpdateDTO, id: number) {
  return userRepository.updateUser(data, id);
}
