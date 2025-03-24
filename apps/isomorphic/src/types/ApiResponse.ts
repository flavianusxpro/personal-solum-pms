interface Role {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  permissions: any[]; // You can replace 'any' with a more specific type if needed
}

interface UserData {
  access_token: string;
  role: Role;
}

export interface SignInApiResponse {
  success: boolean;
  data: UserData;
}

export interface SignInApiInvalidResponse {
  error: string;
  status: number;
  ok: boolean;
  url: null;
}
