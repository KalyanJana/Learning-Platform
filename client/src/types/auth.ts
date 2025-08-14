export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

export interface DecodedToken {
  exp?: number; // expiration timestamp
  iat?: number;
  [key: string]: any;
}

export interface AuthUser {
  id: string;
  email: string;
  username?: string;
}
