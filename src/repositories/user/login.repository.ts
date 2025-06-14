import { prisma } from '../../lib/prisma';

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
  async deleteToken(token: string) {
    return await prisma.loginToken.deleteMany({ where: { token } });
  }

  async getToken(token: string) {
    return await prisma.loginToken.findFirst({ where: { token } });
  }
}

export default new LoginRepository();
