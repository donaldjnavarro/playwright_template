import { BaseApi } from './base_api';
import { config } from 'dotenv';
import { env } from 'node:process';
config({ path: './.env' });
import type { ApiOptions } from './base_api';

/**
 * Represents the structure of the response from the OpenAI "list models" endpoint.
 * Contains the top-level object type and an array of model details.
 */
export interface OpenAIGetModelsResponse {
  /** Top-level type of the response, always "list" for this endpoint */
  object: "list";

  /** Array of models returned by the API */
  data: {
    /** Unique identifier for the model */
    id: string;

    /** Type of the object, always "model" for entries in this array */
    object: "model";

    /** Unix timestamp representing when the model was created */
    created: number;

    /** Owner of the model */
    owned_by: string;
  }[];
}

/**
 * API wrapper for OpenAI endpoints.
 * Extends BaseApi to handle HTTP requests and context management.
 * Endpoint-specific logic and response typing are defined here.
 */
export class OpenAIApi extends BaseApi {
  /** API configuration options including baseURL and headers */
  readonly options: ApiOptions;

  constructor() {
    super();

    // Ensure an API key is available in environment variables
    if (!env.OPENAI_API_KEY) {
      throw new Error(`API Key needed for OpenAI API is missing. Expected it stored in .env as "OPENAI_API="`);
    }

    // Configure the API context for OpenAI with base URL and authorization
    this.options = {
      baseURL: 'https://api.openai.com/v1/',
      extraHTTPHeaders: {
        Authorization: `Bearer ${env.OPENAI_API_KEY}`
      }
    };
  }

  /**
   * Retrieve a list of available OpenAI language models.
   * Uses the generic apiRequest method from BaseApi and provides a typed response.
   *
   * @returns Promise resolving to a fully typed response containing all models
   */
  async getModels(): Promise<OpenAIGetModelsResponse> {
    return await this.apiRequest<OpenAIGetModelsResponse>('get', 'models', this.options);
  }
};
