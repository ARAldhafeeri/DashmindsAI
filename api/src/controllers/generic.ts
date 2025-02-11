import { Request, Response } from "express";
import { asyncController } from "@/utils/handlers";
import { asyncStorageSerivce } from "../services";

class Controller<T> {
  constructor(protected service: T) {
    this.service = service;
  }

  fetch = asyncController(async (req: Request, res: Response) => {
    const paginate = {
      page: parseInt(req.query.page as string, 10) || 1,
      limit: Math.min(10, parseInt(req.query.limit as string, 10) || 5),
    };
    const orgUID = await asyncStorageSerivce.getOrgUID();
    const data = await (this.service as any).find(orgUID, paginate);
    res.status(200).json({ data, status: true, message: "Data fetched" });
  });

  search = asyncController(async (req: Request, res: Response) => {
    const paginate = {
      page: parseInt(req.query.page as string, 10) || 1,
      limit: Math.min(10, parseInt(req.query.limit as string, 10) || 5),
    };
    const query = req.body.payload as string;
    const orgUID = await asyncStorageSerivce.getOrgUID();
    const data = await (this.service as any).search(query, orgUID, paginate);
    res.status(200).json({ data, status: true, message: "Search results" });
  });

  create = asyncController(async (req: Request, res: Response) => {
    const orgUID = await asyncStorageSerivce.getOrgUID();

    const data = await (this.service as any).create(req.body, orgUID);
    res
      .status(201)
      .json({ data, status: true, message: "Created successfully" });
  });

  update = asyncController(async (req: Request, res: Response) => {
    const orgUID = await asyncStorageSerivce.getOrgUID();
    const data = await (this.service as any).update(
      req.body,
      orgUID,
      req.query.id as string
    );
    res
      .status(200)
      .json({ data, status: true, message: "Updated successfully" });
  });

  delete = asyncController(async (req: Request, res: Response) => {
    const orgUID = await asyncStorageSerivce.getOrgUID();
    const data = await (this.service as any).delete(
      req.query.id as string,
      orgUID
    );
    res
      .status(200)
      .json({ data, status: true, message: "Deleted successfully" });
  });
}

export default Controller;
