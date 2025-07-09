import { atomWithStorage } from 'jotai/utils';
import { CONNECTION } from '@/config/constants';

export interface CONNECTION {
  hostname?: string;
  access_token?: string;
  x_token?: string;
  x_session_id?: string;
  connection_name?: string;
}

export const defaultConnection: CONNECTION = {};

// Original atom.
export const connectionAtom = atomWithStorage(CONNECTION, defaultConnection);
