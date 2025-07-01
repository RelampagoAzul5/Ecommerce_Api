import { JwtPayload } from 'jsonwebtoken';
import { PrismaClientKnownRequestError } from '../../../generated/prisma/runtime/library';
import productImageService from '../../services/product/productImages.service';
import { Request, Response } from 'express';
import storeService from '../../services/store/store.service';
import productService from '../../services/product/product.service';

class ProductImagesController {
  async uploadImages(req: Request, res: Response) {
    const productId = Number(req.params.productId);

    const files = req.files as Express.Multer.File[];

    if (!files) {
      res.status(400).json({ error: 'Nenhuma imagem foi enviada' });
      return;
    }
    const images = [];
    try {
      for (let i = 0; i < files.length; i++) {
        const image = await productImageService.uploadImage(
          files[i],
          productId,
        );
        images.push({ imageUrl: image.url });
      }
      res.status(201).json(images);
      return;
    } catch (error) {
      res.status(500).json({ error: 'Erro ao salvar imagens' });
      return;
    }
  }

  async getAllImages(req: Request, res: Response) {
    const id = Number(req.params.userId);

    if (isNaN(id)) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }

    try {
      const images = await productImageService.getAllImages(id);
      if (!images) {
        res.status(404).json({ error: 'Imagens não encontradas' });
        return;
      }
      res.json(images);
    } catch (err) {}
  }

  async getImage(req: Request, res: Response) {
    const productId = Number(req.params.productId);
    const imageId = Number(req.params.imageId);

    if (isNaN(productId)) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }
    if (isNaN(imageId)) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }

    try {
      const image = await productImageService.getImage(imageId, productId);
      if (!image) {
        res.status(404).json({ error: 'Imagem não encontrada' });
        return;
      }
      res.json(image);
    } catch (err) {}
  }

  async deleteImage(req: Request, res: Response) {
    const userIdFromToken = (req.user as JwtPayload).userId;

    const productId = Number(req.params.productId);
    const imageId = Number(req.params.imageId);
    let hasThisProduct = false;

    if (isNaN(productId)) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }
    if (isNaN(imageId)) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }

    try {
      const store = await storeService.getUserStore(userIdFromToken);
      if (!store) {
        res.status(404).json({
          error:
            'Loja não encontrada! Você só pode editar os próprios produtos!',
        });
        return;
      }
      const products = await productService.getAllStoreProducts(store.id);
      if (!products) {
        res.status(404).json({
          error: 'Você não tem produtos!',
        });
        return;
      }
      for (let product of products) {
        if (product.id !== productId) continue;
        hasThisProduct = true;
        break;
      }
      if (!hasThisProduct) {
        res.status(400).json({ error: 'Esse produto não pertence a você!' });
        return;
      }
      await productImageService.deleteImage(imageId, productId);
      res.json({
        message: `Imagem foi deletada com sucesso!`,
      });
      return;
    } catch (err) {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        res.status(404).json({ error: 'Imagem não encontrada' });
        return;
      }
      res.status(500).json({ error: 'Não foi possível deletar Imagem' });
    }
  }

  async deleteAllImages(req: Request, res: Response) {
    const userIdFromToken = (req.user as JwtPayload).userId;

    const productId = Number(req.params.productId);
    let hasThisProduct = false;

    if (isNaN(productId)) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }

    try {
      const store = await storeService.getUserStore(userIdFromToken);
      if (!store) {
        res.status(404).json({
          error:
            'Loja não encontrada! Você só pode editar os próprios produtos!',
        });
        return;
      }
      const products = await productService.getAllStoreProducts(store.id);

      if (!products) {
        res.status(404).json({
          error: 'Você não tem produtos!',
        });
        return;
      }

      for (let product of products) {
        if (product.id !== productId) continue;
        hasThisProduct = true;
        break;
      }

      if (!hasThisProduct) {
        res.status(400).json({ error: 'Esse produto não pertence a você!' });
        return;
      }
      await productImageService.deleteAllImages(productId);
      res.json({
        message: `Imagens foram deletadas com sucesso!`,
      });
      return;
    } catch (err) {
      res.status(404).json({ error: 'Imagens não encontradas' });
    }
  }
}

export default new ProductImagesController();
