import { BaseApi } from './base_api';
import { config } from 'dotenv';
import { env } from 'node:process';
config({ path: './.env' });
import type { ApiOptions } from './base_api';

/**
 * Response schema for the Postman "basic-auth" endpoint.
 * Indicates whether the request was successfully authenticated.
 */
export interface PostmanBasicAuthResponse {
  /** True if authentication succeeded */
  authenticated: boolean;
}

/** Response schema for Postman /get endpoint */
export interface PostmanGetResponse {
  args: Record<string, string>;
  headers: {
    host: string;
    'postman-token': string;
    'accept-encoding': string;
    'user-agent': string;
    'x-forwarded-proto': string;
    authorization: string;
    accept: string;
  };
  url: string;
}

export interface PostmanPostResponse {
  args: {
    [key: string]: string;
  };
  data: {
    [key: string]: unknown; // Dynamic keys depending on request body
  };
  files: Record<string, unknown>;
  form: Record<string, unknown>;
  headers: {
    host: string;
    'postman-token': string;
    'accept-encoding': string;
    accept: string;
    'x-forwarded-proto': string;
    'user-agent': string;
    authorization: string;
    'content-type': string;
    'content-length': string;
    cookie: string;
  };
  json: Record<string, unknown>; // Mirrors request body
  url: string;
}

/**
 * API wrapper for Postman endpoints.
 * Extends BaseApi to handle HTTP requests and context management.
 * Endpoint-specific logic and response typing are defined here.
 */
export class PostmanApi extends BaseApi {
  /** API configuration options including baseURL and authentication */
  readonly options: ApiOptions;

  constructor() {
    super();

    // Ensure Basic Auth credentials are available in environment variables
    if (!env.POSTMAN_API_USERNAME || !env.POSTMAN_API_PASSWORD) {
      throw new Error(`Auth needed for Postman API is missing. Expected it stored in .env as "POSTMAN_API_USERNAME=" and "POSTMAN_API_PASSWORD="`);
    }

    // Configure the API context for Postman with base URL and credentials
    this.options = {
      baseURL: 'https://postman-echo.com/',
      httpCredentials: {
        username: env.POSTMAN_API_USERNAME,
        password: env.POSTMAN_API_PASSWORD
      }
    };
  }

  /**
   * Verify Basic Authentication against the Postman API.
   * Uses GET request to /basic-auth endpoint.
   * @returns Promise resolving to a typed response indicating authentication success
   */
  async getBasicAuth(): Promise<PostmanBasicAuthResponse> {
    return await this.apiRequest<PostmanBasicAuthResponse>('get', 'basic-auth', this.options);
  }

  /**
   * Echo a POST request to the Postman API.
   * Uses POST request to /post endpoint and returns the full response structure.
   * @param requestBody Object to send as request payload
   * @returns Promise resolving to a typed response reflecting request details
   */
  async postExample(requestBody: object): Promise<PostmanPostResponse> {
    return await this.apiRequest<PostmanPostResponse>('post', 'post', this.options, { data: requestBody });
  }
};
