import { Request, Response } from 'express';
import * as userService from '../services/user.service';
import userValidation from '../utils/userValidation';
import { PrismaClientKnownRequestError } from '../../generated/prisma/runtime/library';

export async function createUser(req: Request, res: Response) {
  req.body.bornDate = new Date(req.body.bornDate);

  const errors = userValidation(req.body);

  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }
  try {
    const user = await userService.createUser(req.body);
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
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
}

export async function getUser(req: Request, res: Response) {
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

export async function deleteUser(req: Request, res: Response) {
  try {
    await userService.deleteUser(Number(req.params.id));
    res.json({
      message: `Usuário foi deletado com sucesso!`,
    });
    return;
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
      res.status(404).json({ error: 'Usuário não encontrado' });
      return;
    }
    res.status(500).json({ error: 'Não foi possível deletar usuário' });
  }
}
