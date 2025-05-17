import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const addAppointmentNotesSchema = z.object({
  notes: z.string().min(1, {
    message: messages.noteIsRequired,
  }),
});

// generate form types from zod validation schema
export type AddAppointmentNotesForm = z.infer<typeof addAppointmentNotesSchema>;
