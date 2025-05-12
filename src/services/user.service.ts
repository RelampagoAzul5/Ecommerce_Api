import * as userRepository from '../repositories/user.repository';
import { CreateUserDTO } from '../interfaces/user.interface';

export async function createUser(data: CreateUserDTO) {
  return await userRepository.createUser(data);
}
