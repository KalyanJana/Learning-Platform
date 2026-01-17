export interface UserType {
  name: string;
  email: string;
  mobileNo: string;
  password: string; // hashed password
  refreshTokens: string[]; //store active refresh tokens
  role: string;
  referralCode?: string;
  referredByCode?: string;
  rewardPoints?: number;
  referralCount?: number;
}
