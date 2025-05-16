import userAvatarService from '../services/userAvatar.service';
import { Request, Response } from 'express';

class UserAvatarController {
  async uploadAvatar(req: Request, res: Response) {
    const userId = Number(req.params.userId);
    const file = req.file as Express.Multer.File;

    if (!file || !file.path) {
      res.status(400).json({ error: 'Nenhuma imagem foi enviada' });
      return;
    }

    try {
      const avatar = await userAvatarService.uploadAvatar(file, userId);
      res.status(201).json({ avatarUrl: avatar.url });
      return;
    } catch (error) {
      res.status(500).json({ error: 'Erro ao salvar avatar' });
      return;
    }
  }

  async getAvatar(req: Request, res: Response) {}

  async deleteAvatar(req: Request, res: Response) {}
}

export default new UserAvatarController();
