export interface CreateStoreDTO {
  name: string;
  credentialType: string;
  credential: string;
  userId: number;
}

export interface StoreUpdateDTO {
  userId: number;
  name?: string;
  avatarId?: number;
  credentialType?: string;
  credential?: string;
}

export interface GetStoreDTO {
  userId: number;
  name: string;
  avatarId: number | null;
  credentialType: string;
  credential: string;
}
