// external-imports
import z from 'zod';

// schema for taskTitle
const taskTitleSchema = z
  .string()
  .trim()
  .min(3, { error: 'taskTitle must be at least 3 characters long' })
  .max(30, { error: 'taskTitle must be at most 30 characters long' });

// schema for taskDescription
const taskDescriptionSchema = z
  .string()
  .trim()
  .min(10, { error: 'taskDescription must be at least 10 characters long' })
  .max(50, { error: 'taskDescription must be at most 50 characters long' });

// schema for taskId
const taskIdSchema = z.object({
  id: z.uuid({ error: 'Task ID is required' }),
});

// schema for createTask
export const createTaskSchema = z.object({
  body: z.object({
    taskTitle: taskTitleSchema,
    taskDescription: taskDescriptionSchema,
  }),
});

// schema for updateTask
export const updateTaskSchema = z.object({
  params: taskIdSchema,
  body: z
    .object({
      taskTitle: taskTitleSchema.optional(),
      taskDescription: taskDescriptionSchema.optional(),
      isTaskCompleted: z.boolean().optional(),
    })
    .refine(data => Object.keys(data).length > 0, {
      message: 'Request body cannot be empty, at least one field must be provided to update a task',
    }),
});

// schema for deleteTask
export const deleteTaskSchema = z.object({
  params: taskIdSchema,
});
