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
  principalAddressId?: number;
  avatarId?: number | null;
  bornDate?: Date;
}

export interface GetUserDTO {
  name: string;
  cpf: string;
  bornDate: Date;
  avatarId: number | null;
  principalAddressId: number | null;
  cartId: number;
}
