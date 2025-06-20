import {
  CreateProductDTO,
  UpdateProductDTO,
} from '../interfaces/product.interface';

class ProductValidation {
  private _validateName(name: string) {
    return !name ? false : true;
  }

  productCreateValidation(data: CreateProductDTO) {
    const errors = [];
    if (!this._validateName(data.name)) errors.push('Nome Inválido');

    return errors;
  }

  productUpdateValidation(data: UpdateProductDTO) {
    const errors = [];
    if (!data) {
      errors.push('Dados de entrada ausentes');
      return errors;
    }

    if (data.name && !this._validateName(data.name))
      errors.push('Nome Inválido');

    return errors;
  }
}
export default new ProductValidation();
