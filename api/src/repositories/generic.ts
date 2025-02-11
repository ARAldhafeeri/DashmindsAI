import { IRepository } from "../types/generic";
import { Model, Document, UpdateQuery, QueryOptions } from "mongoose";
import { FilterQuery, ProjectionType, Types } from "mongoose";

export class Repository<T> implements IRepository<any> {
  constructor(private model: Model<T>) {}

  async find(
    filter: FilterQuery<T>,
    projection: ProjectionType<T>,
    pagination: Paginate
  ): Promise<T[]> {
    return this.model
      .find(filter, projection)
      .sort({ updatedAt: -1, createdAt: -1 })
      .skip((pagination.page - 1) * pagination.limit)
      .limit(pagination.limit);
  }

  async findAll(filter: FilterQuery<T>): Promise<T[]> {
    return this.model.find(filter);
  }

  async create(record: T): Promise<any> {
    const newRecord = new this.model(record);
    return newRecord.save();
  }

  async update(filter: FilterQuery<T>, record: UpdateQuery<T>): Promise<any> {
    return this.model.findOneAndUpdate(filter, record, { new: true }).exec();
  }

  async updateWithQueryOptions(
    filter: FilterQuery<T>,
    record: UpdateQuery<T>,
    queryOptions: QueryOptions<T>
  ): Promise<any> {
    return this.model.findOneAndUpdate(filter, record, {
      new: true,
      ...queryOptions,
    });
  }

  async delete(id: string, organization: string): Promise<any> {
    return this.model.findOneAndDelete({ _id: id, organization }).exec();
  }

  async count(filter: FilterQuery<any>): Promise<number> {
    return this.model.countDocuments(filter).exec();
  }

  async findOne(filter: FilterQuery<T>): Promise<any | null> {
    return this.model.findOne(filter).exec();
  }

  async findAllWithProjection(
    filter: FilterQuery<T>,
    projection: ProjectionType<T>
  ): Promise<any> {
    return this.model.find(filter, projection);
  }
}
