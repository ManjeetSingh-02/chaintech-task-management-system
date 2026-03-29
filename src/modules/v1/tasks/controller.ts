// internal-imports
import { prismaClient, SuccessResponse } from '@/core/index.js';

// type-imports
import type { ISuccessResponse } from '@/core/index.js';
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
  updateTask: (request: Request, response: Response) => {},

  // @controller DELETE /:id
  deleteTask: (_request: Request, response: Response) => {},
};
