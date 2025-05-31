import loginService from '../services/login.service';

class ValidateToken {
  async tokenValidation(token: string) {
    const tokenExists = await loginService.getToken(token);
    return tokenExists ? true : false;
  }
}
export default new ValidateToken();
