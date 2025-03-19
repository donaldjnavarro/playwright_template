import { BaseApi } from './base_api';
import * as playwright from 'playwright';
import { APIResponse } from "@playwright/test";
import { config } from 'dotenv';
import { env } from 'node:process';
config({ path: './.env' });

export class PostmanApi extends BaseApi {
  readonly options: { baseURL: string, httpCredentials: { username: string, password: string }};

  constructor() {
    super();
    // Postman API uses Basic Auth for authentication
    if (!env.POSTMAN_API_USERNAME || !env.POSTMAN_API_PASSWORD) {
      throw new Error(`Auth needed for Postman API is missing. Expected it stored in .env as "POSTMAN_API_USERNAME=" and "POSTMAN_API_PASSWORD="`);
    }
    this.options = {
      baseURL: 'https://postman-echo.com/',
      httpCredentials: {
        username: env.POSTMAN_API_USERNAME,
        password: env.POSTMAN_API_PASSWORD
      }
    };
  };

  /**
   * Send a GET request to the Postman API endpoint designed for verifying basic authentication
   */
  async getBasicAuth(): Promise<{ authenticated: boolean }> {
    // Create API context
    const apiContext = await playwright.request.newContext(this.options);
    // Send GET request to Postman API /basic-auth
    const response: APIResponse = await apiContext.get('basic-auth');
    // Verify request success
    this.verifyStatus(response, 200);
    // Store response body as an object
    const body = await response.json() as { authenticated: boolean };
    // Clean up API context
    await apiContext.dispose();
    // Return the body object
    return body;
  }

  /**
   * Send a POST request to the Postman API endpoint designed for echoing back the request body.
   * @param {object} requestBody - A data object that will be sent as a JSON in the request body
   */
  async postExample(requestBody: object): Promise<{ data: object }> {
    // Create API context
    const apiContext = await playwright.request.newContext(this.options);
    // Send POST request to Postman API /post
    const response: APIResponse = await apiContext.post('post', { data: requestBody });
    // Verify request success
    this.verifyStatus(response, 200);
    // Store response body as an object
    const body = await response.json() as { data: object };
    // Clean up API context
    await apiContext.dispose();
    // Return the body object
    return body;
  }
};
