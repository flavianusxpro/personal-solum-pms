export interface Channel {
  id: string; // UUID
  name: string;
  channelId: number;
  description?: string;
  ownerId: string; // UUID of the user who created it
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string; // UUID
  text: string;
  userId: string; // UUID of the sender
  channelId: string; // UUID of the channel
  createdAt: Date;
  updatedAt: Date;
}
