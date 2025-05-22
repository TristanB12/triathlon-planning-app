import { api } from "../../boot/axios";

export function setAuthorizationHeader(token: string) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}