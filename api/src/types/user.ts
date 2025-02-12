import { IBaseEntity, IController, IRepository, IService } from "./generic";

export interface User extends IBaseEntity {
  firstName: string;
  lastName: string;
  hashedPassword?: string;
  salt?: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
  verified?: boolean;
  role?: string;
  phoneNumber?: string;
}

export interface IUserRepository extends IRepository<User> {}

export interface IUserService extends IService<User> {
  findByEmail(email: string): Promise<User>;
}

export interface IUserController extends IController {}
