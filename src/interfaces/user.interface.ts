export interface CreateUserDTO {
  updated_at: Date;
  name: string;
  cpf: string;
  email: string;
  password: string;
  bornDate: Date;
  avatarId: number;
  principalAddressId: number;
  cartId: number;
}
