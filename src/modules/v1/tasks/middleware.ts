// internal-imports
import { ErrorResponse, prismaClient } from '@/core/index.js';

// type-imports
import type { IErrorResponse } from '@/core/index.js';
import type { Request, Response, NextFunction } from 'express';

// middleware to check if task exists in database
export const doesTaskExist = async (
  request: Request,
  response: Response<IErrorResponse<null>>,
  nextFunction: NextFunction
) => {
  // fetch task from db
  const existingTask = await prismaClient.task.findUnique({
    where: {
      id: request.params.id as string,
    },
  });

  // if task does not exist, send error response
  if (!existingTask)
    return response.status(404).json(
      new ErrorResponse<null>({
        message: 'Task with given id does not exist',
        code: 'TASK_NOT_FOUND',
        issues: null,
      })
    );

  // attach task details to request object for use in controller
  request.task = {
    id: existingTask.id,
    isCompleted: existingTask.isCompleted,
  };

  // forward request to next middleware or controller
  nextFunction();
};
