import {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  Types,
  UpdateQuery,
} from "mongoose";

// generic base for entities across the source code
export interface IBaseEntity {
  _id?: Types.ObjectId;
  organization?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IBaseResponse<T> {
  total: number;
  page: number;
  pageSize: number;
  data: T[];
}

export interface IRepository<T extends IBaseEntity> {
  find(
    filter: FilterQuery<T>,
    projection: ProjectionType<T>,
    pagination: Paginate
  ): Promise<T[]>;
  findAll(filter: FilterQuery<T>): Promise<T[]>;
  findAllWithProjection(
    filter: FilterQuery<T>,
    projection: ProjectionType<T>
  ): Promise<T[]>;

  create(record: T): Promise<T>;
  update(filter: FilterQuery<T>, record: UpdateQuery<T>): Promise<T>;
  updateWithQueryOptions(
    filter: FilterQuery<T>,
    record: UpdateQuery<T>,
    queryOptions: QueryOptions<T>
  ): Promise<any>;
  delete(id: string, organization: string): Promise<T>;
  count(filter: FilterQuery<T>): Promise<number>;
  findOne(filter: FilterQuery<T>): Promise<T>;
}

export interface IService<T extends IBaseEntity> {
  find(organization: string, pagination: Paginate): Promise<T[]>;
  create(record: T, organization: string): Promise<T>;
  update(record: T, organization: string, recordID: string): Promise<T>;
  findOne(filter: FilterQuery<T>): Promise<T>;
  delete(id: string, organization: string): Promise<T>;
  search(
    text: string,
    organization: string,
    pagination: Paginate
  ): Promise<T[]>;
}

export interface IController {
  fetch?: Controller;
  create?: Controller;
  update?: Controller;
  delete?: Controller;
  search?: Controller;
}
