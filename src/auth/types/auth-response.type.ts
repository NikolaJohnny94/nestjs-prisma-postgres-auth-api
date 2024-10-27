import { BaseResponse, TokenResponse } from '.';

export type AuthResponse = BaseResponse & { data: TokenResponse };
