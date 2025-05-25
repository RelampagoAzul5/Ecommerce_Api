import loginService from '../services/login.service';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'ColoqueSeuTokenNoEnviroment';

class LoginController {
  async getLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    console.log(email);
    try {
      const user = await loginService.getUser(email);
      if (!user) {
        res.status(404).json({ error: 'Usuário não encontrado' });
        return;
      }
      console.log(password, user.password);
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
}

export default new LoginController();
