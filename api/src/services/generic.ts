import { IService, IBaseEntity, IRepository } from "../types/generic";
import { Types } from "mongoose";
import ObjectId = Types.ObjectId;

/**
 * Interface representing a generic shared services across multiple services
 * that needs curd.
 * It extends child services with needed functionality for curd.
 */
export class Service<T extends IBaseEntity> implements IService<T> {
  constructor(protected repository: IRepository<T>) {}

  /**
   * Retrieves records with paginations
   * @param organization : orgianzation uid
   * @param pagination : pagination context page, limit.
   * @returns A promise that resolves to the record with pagination data.
   */
  async find(organization: string, pagination: Paginate): Promise<any> {
    const filter = { organization: organization };
    const data = await this.repository.find(filter, {}, pagination);
    const count = await this.repository.count(filter);
    return {
      total: count,
      page: pagination.page,
      pageSize: data.length,
      data: data,
    };
  }

  /**
   * create records for child service entity
   * @param organization : orgianzation uid
   * @param record : entity data.
   * @returns A promise that resolves to the entity created
   */
  async create(record: T, organization: string): Promise<T> {
    record.organization = organization;
    return this.repository.create(record);
  }

  /**
   * update records for child service entity
   * @param organization : orgianzation uid
   * @param record : entity data.
   * @param recordID : id of entity record to be updated.
   * @returns A promise that resolves to the entity created
   */
  async update(record: T, organization: string, recordID: string): Promise<T> {
    const filter = {
      organization: organization,
      _id: new ObjectId(recordID),
    };
    return this.repository.update(filter, record);
  }

  /**
   * deletes records for child service entity
   * @param record : entity data.
   * @param id : id of entity record to be updated.
   * @returns A promise that resolves to the entity created
   */
  async delete(id: string, organization: string): Promise<T> {
    return this.repository.delete(id, organization);
  }

  /**
   * full text search against string, text index must be activated against the field.
   * @param text : text query
   * @param organization : id of organization.
   * @param pagination : pagination context page, limit.
   * @returns A promise that resolves to the entity created
   */
  async search(
    text: string,
    organization: string,
    pagination: Paginate
  ): Promise<any> {
    const filter = { organization: organization, $text: { $search: text } };
    const data = await this.repository.find(filter, {}, pagination);
    const count = await this.repository.count(filter);

    return {
      total: count,
      page: pagination.page,
      pageSize: data.length,
      data: data,
    };
  }
}
