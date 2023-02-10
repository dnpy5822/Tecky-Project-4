export type User = {
  id: number;
  username: string;
  email: string;
  avatar?: string | null;
  isAdmin: boolean;
  isBanned: boolean;
};

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
