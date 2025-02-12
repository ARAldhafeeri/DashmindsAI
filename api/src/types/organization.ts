import { IBaseEntity, IController, IRepository, IService } from "./generic";

export interface Organization extends IBaseEntity {
  name: string;
}

export interface IOrganizationRepository extends IRepository<Organization> {}

export interface IOrganizationService extends IService<Organization> {}

export interface IOrganizationController extends IController {}
