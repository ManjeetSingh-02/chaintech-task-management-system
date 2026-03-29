// type-imports
import type { Request, Response } from 'express';

// controller for module
export const controller = {
  // @controller POST /
  createTask: (request: Request, response: Response) => {},

  // @controller GET /
  getAllTasks: (_request: Request, response: Response) => {},

  // @controller PATCH /:id
  updateTask: (request: Request, response: Response) => {},

  // @controller DELETE /:id
  deleteTask: (_request: Request, response: Response) => {},
};
