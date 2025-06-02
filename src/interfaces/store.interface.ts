export interface CreateStoreDTO {
  name: string;
  cnpj?: string;
  userId: number;
}

export interface StoreUpdateDTO {
  name?: string;
  avatarId?: number;
}

export interface GetStoreDTO {
  name: string;
  avatarId: number | null;
}
