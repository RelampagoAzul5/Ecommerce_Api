import loginRepository from '../../repositories/user/login.repository';
class LoginService {
  async getUser(email: string) {
    return await loginRepository.getUser(email);
  }
  async createToken(userId: number, token: string) {
    return await loginRepository.createToken(userId, token);
  }
  async deleteToken(token: string) {
    return await loginRepository.deleteToken(token);
  }
  async getToken(token: string) {
    return await loginRepository.getToken(token);
  }
}

export default new LoginService();
