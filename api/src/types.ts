export type RequestWithUser = Request & {
  user: { username: string; sub: string };
};
