import { Request, Response } from 'express';
import userService from '../../services/user/user.service';
import userValidation from '../../utils/userValidation';
import { PrismaClientKnownRequestError } from '../../../generated/prisma/runtime/library';
import { UserUpdateDTO } from '../../interfaces/user.interface';
import { JwtPayload } from 'jsonwebtoken';

class UserController {
  async createUser(req: Request, res: Response) {
    req.body.bornDate = new Date(req.body.bornDate);
    const file = req.file as Express.Multer.File;

    const errors = userValidation.userCreateValidation(req.body);

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }
    try {
      const user = await userService.createUser(req.body, file);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          res.status(409).json({
            error: `Email ou cpf já cadastrados!`,
          });
          return;
        }
      }
      console.log(error);
      res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  }

  async getUser(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }

    try {
      const user = await userService.getUser(id);
      if (!user) {
        res.status(404).json({ error: 'Usuário não encontrado' });
        return;
      }
      res.json(user);
    } catch (err) {}
  }

  async deleteUser(req: Request, res: Response) {
    const userIdFromToken = (req.user as JwtPayload).userId;

    try {
      await userService.deleteUser(userIdFromToken);
      res.json({ message: `Usuário foi deletado com sucesso!` });
    } catch (err) {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        res.status(404).json({ error: 'Usuário não encontrado' });
      } else {
        res.status(500).json({ error: 'Não foi possível deletar usuário' });
      }
    }
  }

  async updateUser(req: Request, res: Response) {
    const updatedUser: UserUpdateDTO = req.body;
    const userIdFromToken = (req.user as JwtPayload).userId;

    const errors = userValidation.userUpdateValidation(updatedUser);
    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    try {
      const user = await userService.updateUser(updatedUser, userIdFromToken);
      res.status(200).json(user);
    } catch (err) {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        res.status(404).json({ error: 'Usuário não encontrado' });
      } else {
        res.status(500).json({ error: 'Não foi possível atualizar usuário' });
      }
    }
  }
}

export default new UserController();
