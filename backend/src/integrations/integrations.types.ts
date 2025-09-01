export interface IntegrationAdapter {
  getAuthorizationUrl(state: string): string;
  exchangeCodeForToken(code: string): Promise<TokenResponse>;
  refreshAccessToken(refreshToken: string): Promise<TokenResponse>;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: number;
}

export enum IntegrationProvider {
  STRAVA = 'strava',
}