import { Decimal } from 'generated/prisma/runtime/library';

export interface CreateProductDTO {
  storeId: number;
  name: string;
  price: Decimal;
  description: string;
  purchasedTimes: number;
}

export interface UpdateProductDTO {
  name?: string;
  description?: string;
  price?: Decimal;
  purchasedTimes?: number;
}

export interface GetProductDTO {
  name: string;
  price: Decimal;
  description: string;
  purchasedTimes: number;
}
