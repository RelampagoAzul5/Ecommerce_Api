import { JwtPayload } from 'jsonwebtoken';
import { PrismaClientKnownRequestError } from '../../generated/prisma/runtime/library';
import userAvatarService from '../services/userAvatar.service';
import { Request, Response } from 'express';

class UserAvatarController {
  async uploadAvatar(req: Request, res: Response) {
    const userIdFromParams = Number(req.params.userId);
    const userIdFromToken = (req.user as JwtPayload).userId;
    if (userIdFromToken !== userIdFromParams) {
      res.status(403).json({
        error: 'Você só consegue mudar a foto de perfil da própria loja!',
      });
      return;
    }
    const file = req.file as Express.Multer.File;

    if (!file || !file.path) {
      res.status(400).json({ error: 'Nenhuma imagem foi enviada' });
      return;
    }

    try {
      const avatar = await userAvatarService.uploadAvatar(
        file,
        userIdFromParams,
      );
      res.status(201).json({ avatarUrl: avatar.url });
      return;
    } catch (error) {
      res.status(500).json({ error: 'Erro ao salvar avatar' });
      return;
    }
  }

  async getAvatar(req: Request, res: Response) {
    const id = Number(req.params.userId);

    if (isNaN(id)) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }

    try {
      const avatar = await userAvatarService.getAvatar(id);
      if (!avatar) {
        res.status(404).json({ error: 'Avatar não encontrado' });
        return;
      }
      res.json(avatar);
    } catch (err) {}
  }

  async deleteAvatar(req: Request, res: Response) {
    const userIdFromParams = Number(req.params.userId);
    const userIdFromToken = (req.user as JwtPayload).userId;

    if (isNaN(userIdFromParams)) {
      res.status(400).json({ error: 'Id de usuário inválido' });
      return;
    }

    if (userIdFromToken !== userIdFromParams) {
      res
        .status(403)
        .json({ error: 'Você só consegue deletar a própria foto de perfil' });
      return;
    }

    try {
      await userAvatarService.deleteAvatar(userIdFromParams);
      res.json({
        message: `Avatar foi deletado com sucesso!`,
      });
      return;
    } catch (err) {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        res.status(404).json({ error: 'Avatar não encontrado' });
        return;
      }
      res.status(500).json({ error: 'Não foi possível deletar Avatar' });
    }
  }
}

export default new UserAvatarController();
