// internal-imports
import { ErrorResponse, prismaClient, SuccessResponse } from '@/core/index.js';

// type-imports
import type { IErrorResponse, ISuccessResponse } from '@/core/index.js';
import type { Request, Response } from 'express';

// controller for module
export const controller = {
  // @controller POST /
  createTask: async (request: Request, response: Response<ISuccessResponse<object>>) => {
    // create a new task in db
    const newTask = await prismaClient.task.create({
      data: {
        title: request.body.taskTitle,
        description: request.body.taskDescription,
      },
    });

    // send success response
    return response.status(201).json(
      new SuccessResponse({
        message: 'Task created successfully',
        data: newTask,
      })
    );
  },

  // @controller GET /
  getAllTasks: async (_request: Request, response: Response) => {
    // fetch all tasks from db
    const existingTasks = await prismaClient.task.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    // send success response
    return response.status(200).json(
      new SuccessResponse({
        message: 'Tasks fetched successfully',
        data: existingTasks,
      })
    );
  },

  // @controller PATCH /:id
  updateTask: async (
    request: Request,
    response: Response<ISuccessResponse<object> | IErrorResponse<null>>
  ) => {
    // create a object to hold the fields to be updated
    const taskUpdationObject: { title?: string; description?: string; isCompleted?: boolean } = {};

    // if the request body has taskTitle, add it to data object
    if (request.body.taskTitle) taskUpdationObject.title = request.body.taskTitle;

    // if the request body has taskDescription, add it to data object
    if (request.body.taskDescription) taskUpdationObject.description = request.body.taskDescription;

    // if the request body has isTaskCompleted
    if (request.body.isTaskCompleted !== undefined) {
      // if the task is completed and the request is marking it completed again, send error response
      if (request.task.isCompleted && request.body.isTaskCompleted)
        return response.status(400).json(
          new ErrorResponse<null>({
            message: 'Task is already marked as completed',
            code: 'TASK_ALREADY_COMPLETED',
            issues: null,
          })
        );

      // add it to data object
      taskUpdationObject.isCompleted = request.body.isTaskCompleted;
    }

    // update the task in db
    const updatedTask = await prismaClient.task.update({
      where: {
        id: request.params.id as string,
      },
      data: taskUpdationObject,
    });

    // send success response
    return response.status(200).json(
      new SuccessResponse<object>({
        message: 'Task updated successfully',
        data: updatedTask,
      })
    );
  },

  // @controller DELETE /:id
  deleteTask: (_request: Request, response: Response) => {},
};
