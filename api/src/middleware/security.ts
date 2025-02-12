import { Application, NextFunction, Request, Response } from "express";
export const headersSetting = (req : Request, res : Response, next: NextFunction)  => {
  // Set the X-XSS-Protection header to prevent reflected XSS attacks
  res.setHeader('X-XSS-Protection', '1; mode=block');
  // Set the X-Content-Type-Options header to prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  next();
}

export const applyServerHardening = (app : Application) => {
  app.disable('x-powered-by');
  // Make your Express app use your custom middleware:
  app.use(headersSetting);
}
