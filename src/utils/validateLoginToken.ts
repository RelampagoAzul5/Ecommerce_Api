import loginService from '../services/login.service';

class ValidateToken {
  async tokenValidation(token: string) {
    const tokenExists = await loginService.getToken(token);
    return tokenExists ? true : false;
  }
  async deleteInvalidToken(token: string) {
    loginService.deleteToken(token);
  }
}
export default new ValidateToken();
