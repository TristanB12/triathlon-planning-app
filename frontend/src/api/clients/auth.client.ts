import { api } from "../../boot/axios";
import type { AppSession } from "../../stores/models";
import type { CurrentUser, LoginBody, RegisterBody } from "../types/auth.type";
import { setAuthorizationHeader } from "../utils/set-authorization-header";

export class AuthClient {
  static async login(body: LoginBody): Promise<AppSession> {
    const response  = await api.post<AppSession>('/auth/login', body);
  
    return response.data;
  }
  
  static async register(body: RegisterBody): Promise<AppSession> {
    const response  = await api.post<AppSession>('/auth/register', body);
  
    return response.data;
  }
  
  static async getMe(): Promise<CurrentUser> {
    const response  = await api.get<CurrentUser>('/auth/me');
  
    return response.data;
  }
  
  static async refreshTokens(refreshToken: string): Promise<AppSession> {
    setAuthorizationHeader(refreshToken);
    const response  = await api.get<AppSession>('/auth/refresh');
  
    return response.data;
  }
}
