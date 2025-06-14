import loginService from '../../services/user/login.service';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'ColoqueSeuTokenNoEnviroment';

class LoginController {
  async getLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await loginService.getUser(email);
      if (!user) {
        res.status(404).json({ error: 'Usuário não encontrado' });
        return;
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        res.status(401).json({ error: 'Senha incorreta' });
        return;
      }
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: '1h',
      });
      await loginService.createToken(user.id, token);

      res.json({
        token,
        user: { id: user.id, email: user.email, name: user.name },
      });
    } catch (err) {
      res.status(500).json({ error: 'Interanal Server Error' });
      return;
    }
  }
  async logout(req: Request, res: Response) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Token não encontrado' });
      return;
    }

    const token = authHeader.split(' ')[1];

    try {
      await loginService.deleteToken(token);
      res.status(200).json({ message: 'Logout realizado com sucesso' });
      return;
    } catch (err) {
      res.status(500).json({ error: 'Erro ao realizar logout' });
      return;
    }
  }
}

export default new LoginController();
