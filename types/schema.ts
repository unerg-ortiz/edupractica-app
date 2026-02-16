import { z } from 'zod';

export const CategorySchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Name is required").max(50, "Name must be at most 50 characters"),
    description: z.string().optional(),
    icon: z.string().optional(), // Store icon name as string
    isActive: z.boolean(),
    parentId: z.string().optional(), // For hierarchy
});

export type Category = z.infer<typeof CategorySchema>;
