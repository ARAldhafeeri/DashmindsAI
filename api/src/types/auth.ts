export interface IAuthService {
  login(email: string, password: string): Promise<any>;
}

export interface IAuthController {
  login: Controller;
}
