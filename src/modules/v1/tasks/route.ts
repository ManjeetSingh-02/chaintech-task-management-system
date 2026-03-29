// internal-imports
import { asyncHandler, validateZodSchema } from '@/core/index.js';
import { controller } from './controller.js';
import { createTaskSchema, deleteTaskSchema, updateTaskSchema } from './zod.js';

// external-imports
import { Router } from 'express';

// router for module
export const router = Router();

// @route POST /
router.get('/', validateZodSchema(createTaskSchema), asyncHandler(controller.createTask));

// @route GET /
router.get('/', asyncHandler(controller.getAllTasks));

// @route PATCH /:id
router.get('/:id', validateZodSchema(updateTaskSchema), asyncHandler(controller.updateTask));

// @route DELETE /:id
router.delete('/:id', validateZodSchema(deleteTaskSchema), asyncHandler(controller.deleteTask));
