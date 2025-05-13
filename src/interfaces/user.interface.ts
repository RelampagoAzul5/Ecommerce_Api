export interface CreateUserDTO {
  name: string;
  cpf: string;
  email: string;
  password: string;
  bornDate: Date;
}

export interface UserUpdateDTO {
  name?: string;
  email?: string;
  password?: string;
  principalAdressID?: number;
  avatarId?: number;
  bornDate?: Date;
}
