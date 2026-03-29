// internal-imports
import { controller } from './controller.js';

// external-imports
import { Router } from 'express';

// router for module
export const router = Router();

// @route POST /
router.get('/', controller.createTask);

// @route GET /
router.get('/', controller.getAllTasks);

// @route PATCH /:id
router.get('/:id', controller.updateTask);

// @route DELETE /:id
router.delete('/:id', controller.deleteTask);
