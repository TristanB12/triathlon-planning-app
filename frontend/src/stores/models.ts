export interface AppSession {
  access_token: string
  refresh_token: string
  expires_at: number
}


export enum AppStatus {
  UNAUTHENTICATED,
  AUTHENTICATED,
  LOADING,
}