import { BaseApi } from './base_api';
import { config } from 'dotenv';
import { env } from 'node:process';
config({ path: './.env' });
import { type ApiOptions } from './base_api';

/** API response data types */
interface OpenAIModel {
  id: string;
  object: string;
  created: number;
  owned_by: string;
};

interface OpenAIGetModelsResponse {
  object: string;
  data: Array<OpenAIModel>;
};

export class OpenAIApi extends BaseApi {
  readonly options: ApiOptions;

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
   */
  async getModels(): Promise<OpenAIGetModelsResponse> {
    return await this.apiRequest('get', 'models', this.options) as OpenAIGetModelsResponse;
  }
};
