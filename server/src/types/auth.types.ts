import { User } from "@prisma/client"; // adjust if not using Prisma

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  user: User;
}
