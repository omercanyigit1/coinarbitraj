export interface IUserService {
  login(): Promise<unknown>;
  register(): Promise<unknown>;
}