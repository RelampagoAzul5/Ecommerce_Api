import { Request, Response } from 'express';
import { PrismaClientKnownRequestError } from '../../../generated/prisma/runtime/library';
import { JwtPayload } from 'jsonwebtoken';
import productValidation from '../../utils/productValidation';
import productService from '../../services/product/product.service';
import { UpdateProductDTO } from '@/interfaces/product.interface';
import storeService from '../../services/store/store.service';

class ProductController {
  async createProduct(req: Request, res: Response) {
    const file = req.file as Express.Multer.File;
    const userIdFromToken = (req.user as JwtPayload).userId;

    const errors = productValidation.productCreateValidation(req.body);

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }
    try {
      const product = await productService.createProduct(
        req.body,
        file,
        userIdFromToken,
      );
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar produto' });
    }
  }

  async getProduct(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }

    try {
      const product = await productService.getProduct(id);
      if (!product) {
        res.status(404).json({ error: 'Produto não encontrado' });
        return;
      }
      res.json(product);
    } catch (err) {}
  }

  async deleteProduct(req: Request, res: Response) {
    const userIdFromToken = (req.user as JwtPayload).userId;
    const productId = Number(req.params.productId);

    if (isNaN(productId)) {
      res.json({ error: 'Id de produto Inválido' });
      return;
    }

    try {
      const store = await storeService.getUserStore(userIdFromToken);
      if (!store) {
        res.json({
          error:
            'Você não possui uma loja e não pode gerenciar os produtos de outras lojas!',
        });
        return;
      }
      await productService.deleteProduct(store.id, productId);
      res.json({ message: `Produto foi deletado com sucesso!` });
    } catch (err) {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        res
          .status(404)
          .json({ error: 'Produto não encontrado ou não pode ser deletado!' });
      } else {
        res.status(500).json({ error: 'Não foi possível deletar produto' });
      }
    }
  }

  async updateProduct(req: Request, res: Response) {
    const updatedProduct: UpdateProductDTO = req.body;
    const userIdFromToken = (req.user as JwtPayload).userId;
    const productId = Number(req.params.productId);

    const errors = productValidation.productUpdateValidation(updatedProduct);
    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    try {
      const store = await storeService.getUserStore(userIdFromToken);
      if (!store) {
        res.json({
          error:
            'Você não possui uma loja e não pode gerenciar os produtos de outras lojas!',
        });
        return;
      }
      const product = await productService.updateProduct(
        updatedProduct,
        productId,
        store.id,
      );
      res.status(200).json(product);
    } catch (err) {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        res.status(404).json({
          error: 'Produto não encontrado ou não pode ser atualizado!',
        });
      } else {
        res.status(500).json({ error: 'Não foi possível atualizar produto' });
      }
    }
  }
}

export default new ProductController();
