import { BaseApi } from './base_api';
import * as playwright from 'playwright';
import { APIResponse } from "@playwright/test";
import { config } from 'dotenv';
import { env } from 'node:process';
config({ path: './.env' });

export class OpenAIApi extends BaseApi {
  readonly options: { [key: string]: string | { [key: string]: string}};

  constructor() {
    super();
    if (!env.OPENAI_API_KEY) {
      throw new Error(`API Key needed for OpenAI API is missing. Expected it stored in .env as "OPENAI_API="`);
    }
    this.options = {
      baseURL: 'https://api.openai.com/v1/',
      extraHTTPHeaders: {
        Authorization: `Bearer ${env.OPENAI_API_KEY}`
      }
    };
  }

  /**
   * Send a GET request to the OpenAI API to retrieve a list of available language models
   * @returns {Promise<{ data: Array<string> }>}
   */
  async getModels(): Promise<{ data: Array<string> }> {
    // Create API context
    const apiContext = await playwright.request.newContext(this.options);
    // Send GET request
    const response: APIResponse = await apiContext.get('models');
    // Verify response status
    this.verifyStatus(response, 200);
    // Store response body as object
    const body = await response.json() as { data: Array<string> };
    // Clean up API context
    await apiContext.dispose();
    // Return body data
    return body;
  }
};
