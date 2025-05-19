import { z } from 'zod';

// form zod validation schema
export const createCurrencySchema = z.object({
  code: z.string().min(1, { message: 'Currency code is required' }),
  name: z.string().min(1, { message: 'Currency name is required' }),
  symbol: z.string().min(1, { message: 'Currency symbol is required' }),
});

// generate form types from zod validation schema
export type CreateCurrencyInputForm = z.infer<typeof createCurrencySchema>;
