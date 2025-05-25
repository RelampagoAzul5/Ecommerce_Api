import { prisma } from '../lib/prisma';

class LoginRepository {
  async getUser(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  }

  async createToken(userId: number, token: string) {
    const userToken = await prisma.loginToken.create({
      data: { userId, token },
    });
    return userToken;
  }
}

export default new LoginRepository();
