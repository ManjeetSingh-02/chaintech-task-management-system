// external-imports
import { Task } from '@prisma/client';

// declare global augmentation for Express Request object to include task property
declare global {
  namespace Express {
    interface Request {
      task?: Task;
    }
  }
}
