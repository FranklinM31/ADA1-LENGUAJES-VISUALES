//scr/types/users.ts
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export type UserWithoutId = Omit<User, 'id'>;