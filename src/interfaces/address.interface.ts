export interface CreateAddressDTO {
  cep: string;
  road: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  type?: string;
  reference?: string;
}

export interface AddressUpdateDTO {
  cep?: string;
  road?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  country?: string;
  type?: string;
  reference?: string;
}

export interface GetAddressDTO {
  cep: string;
  road: string;
  number: string;
  complement: string | null;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  type: string | null;
  reference: string | null;
}
