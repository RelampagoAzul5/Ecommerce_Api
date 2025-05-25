import loginRepository from '../repositories/login.repository';
class LoginService {
  async getUser(email: string) {
    return await loginRepository.getUser(email);
  }
  async createToken(userId: number, token: string) {
    return await loginRepository.createToken(userId, token);
  }
}

export default new LoginService();
