export interface UserType {
    name: string;
    email: string;
    mobileNo: string;
    password: string; // hashed password
    refreshTokens: string[]; //store active refresh tokens
    role: string;
}
