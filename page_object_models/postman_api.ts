import { BaseApi } from './base_api';
import { config } from 'dotenv';
import { env } from 'node:process';
config({ path: './.env' });
import { type ApiOptions } from './base_api';

/** API response data types */
type PostmanBasicAuthResponse = { authenticated: boolean };
type PostmanPostExampleResponse = {
  args: object,
  data: object,
  files: object,
  form: object,
  headers: {
    host: string,
    'x-request-start': string,
    connection: string,
    'content-length': string,
    'x-forwarded-proto': string,
    'x-forwarded-port': string,
    'x-amzn-trace-id': string,
    'content-type': string,
    authorization: string,
    'user-agent': string,
    accept: string,
    'cache-control': string,
    'postman-token': string,
    'accept-encoding': string,
    cookie: string,
  },
  json: object,
  url: string
};

/**
 * Class for handling all Postman API requests
 */
export class PostmanApi extends BaseApi {
  readonly options: ApiOptions;

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
  async getBasicAuth(): Promise<PostmanBasicAuthResponse> {
    return await this.apiRequest('get', 'basic-auth', this.options) as PostmanBasicAuthResponse;
  }

  /**
   * Send a POST request to the Postman API endpoint designed for echoing back the request body.
   * @param {object} requestBody - A data object that will be sent as a JSON in the request body
   */
  async postExample(requestBody: object): Promise<PostmanPostExampleResponse> {
    return await this.apiRequest('post', 'post', this.options, { data: requestBody }) as PostmanPostExampleResponse;
  }
};
