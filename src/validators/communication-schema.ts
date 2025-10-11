import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const addChannelSchema = z.object({
  channel_name: z.string().min(1, {
    message: messages.channelNameIsRequired,
  }),
});

export const addInvitePeopleSchema = z.object({
  link: z.string().optional(),
  peoples: z.array(z.string()).optional(),
});

// generate form types from zod validation schema
export type ChannelProps = z.infer<typeof addChannelSchema>;
export type InviteProps = z.infer<typeof addInvitePeopleSchema>;
