// internal-imports
import { asyncHandler, validateZodSchema } from '@/core/index.js';
import { controller } from './controller.js';
import { createTaskSchema, deleteTaskSchema, updateTaskSchema } from './zod.js';
import { doesTaskExist } from './middleware.js';

// external-imports
import { Router } from 'express';

// router for module
export const router = Router();

// @route POST /
router.post('/', validateZodSchema(createTaskSchema), asyncHandler(controller.createTask));

// @route GET /
router.get('/', asyncHandler(controller.getAllTasks));

// @route PATCH /:id
router.patch(
  '/:id',
  validateZodSchema(updateTaskSchema),
  asyncHandler(doesTaskExist),
  asyncHandler(controller.updateTask)
);

// @route DELETE /:id
router.delete(
  '/:id',
  validateZodSchema(deleteTaskSchema),
  asyncHandler(doesTaskExist),
  asyncHandler(controller.deleteTask)
);
