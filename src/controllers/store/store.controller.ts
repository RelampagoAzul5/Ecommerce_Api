import { Request, Response } from 'express';
import storeService from '../../services/store/store.service';
import { PrismaClientKnownRequestError } from '../../../generated/prisma/runtime/library';
import { StoreUpdateDTO } from '../../interfaces/store.interface';
import { JwtPayload } from 'jsonwebtoken';
import storeValidation from '../../utils/storeValidation';
import userService from '../../services/user/user.service';

class StoreController {
  async createStore(req: Request, res: Response) {
    const file = req.file as Express.Multer.File;
    const userIdFromToken = (req.user as JwtPayload).userId;

    const errors = storeValidation.storeCreateValidation(req.body);

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }
    try {
      if (req.body.credentialType === 'CPF') {
        const user = await userService.getUser(userIdFromToken);
        req.body.credential = user?.cpf;
      }
      const store = await storeService.createStore(
        req.body,
        file,
        userIdFromToken,
      );
      res.status(201).json(store);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          res.status(409).json({
            error: `Loja já cadastrada!`,
          });
          return;
        }
      }
      res.status(500).json({ error: 'Erro ao criar loja' });
    }
  }

  async getStore(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }

    try {
      const store = await storeService.getStore(id);
      if (!store) {
        res.status(404).json({ error: 'Loja não encontrada' });
        return;
      }
      res.json(store);
    } catch (err) {}
  }

  async deleteStore(req: Request, res: Response) {
    const userIdFromToken = (req.user as JwtPayload).userId;

    try {
      await storeService.deleteStore(userIdFromToken);
      res.json({ message: `Loja foi deletada com sucesso!` });
    } catch (err) {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        res.status(404).json({ error: 'Loja não encontrada' });
      } else {
        res.status(500).json({ error: 'Não foi possível deletar usuária' });
      }
    }
  }

  async updateStore(req: Request, res: Response) {
    const updatedStore: StoreUpdateDTO = req.body;
    const userIdFromToken = (req.user as JwtPayload).userId;

    const errors = storeValidation.storeUpdateValidation(updatedStore);
    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    try {
      const store = await storeService.updateStore(
        updatedStore,
        userIdFromToken,
      );
      res.status(200).json(store);
    } catch (err) {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        res.status(404).json({ error: 'Loja não encontrada' });
      } else {
        res.status(500).json({ error: 'Não foi possível atualizar loja' });
      }
    }
  }
}

export default new StoreController();
