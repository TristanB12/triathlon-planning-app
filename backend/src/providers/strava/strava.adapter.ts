import { ConfigService } from "@nestjs/config";
import { IntegrationAdapter, TokenResponse } from "../../integrations/integrations.types";
import axios from "axios";

export class StravaAdapter implements IntegrationAdapter {
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;
  private scopes = "read,activity:read";
  private authorizationUrl = 'http://www.strava.com/oauth/authorize';
  private tokenUrl = 'https://www.strava.com/oauth/token';

  constructor(config: ConfigService) {
    this.clientId = config.get<string>("STRAVA_CLIENT_ID");
    this.clientSecret = config.get<string>("STRAVA_CLIENT_SECRET");
    this.redirectUri = config.get<string>("STRAVA_REDIRECT_URI");
  }

  getAuthorizationUrl(state: string): string {
    const url = new URL(this.authorizationUrl);
    url.searchParams.set("client_id", this.clientId);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("redirect_uri", this.redirectUri);
    url.searchParams.set("approval_prompt", "force");
    url.searchParams.set("scope", this.scopes);
    url.searchParams.set("state", state);
    return url.toString();
  }

  async exchangeCodeForToken(code: string): Promise<TokenResponse> {
    try {
      const response = await axios.post(this.tokenUrl, {
        code: code,
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: "authorization_code",
      });

      return {
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
        expiresAt: response.data.expires_at * 1000, // Convert to milliseconds
      };
    } catch (error) {
      throw new Error("Failed to exchange code for token with Strava");
    }
  }

  async refreshAccessToken(refreshToken: string): Promise<TokenResponse> {
    try {
      const response = await axios.post(this.tokenUrl, {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      });

      return {
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
        expiresAt: response.data.expires_at * 1000, // Convert to milliseconds
      };
    } catch (error) {
      throw new Error("Failed to refresh access token with Strava");
    }
  }
}