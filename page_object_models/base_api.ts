import { APIResponse, request } from "@playwright/test";

/** Data type for options object to be used with request.newContext() */
export interface ApiOptions {
  baseURL: string,
  extraHTTPHeaders?: { Authorization: string },
  httpCredentials?: { username: string, password: string }
};

export class BaseApi {
  readonly options: ApiOptions;

  constructor() {
    this.options = {
      baseURL: ''
    };
  }

  /**
   * Verify the status code of an API response. Commonly used to verify a successful response with standardized error messaging.
   */
  verifyStatus (response: APIResponse, expectedStatus: number): void {
    if (response.status() !== expectedStatus) {
      throw new Error(`API did not return the expected status code ${expectedStatus}. Actual status code was ${response.status()}`);
    }
  }

  /**
   * Generic method for calling API requests. Assumes the request should return 200 status code.
   */
  async apiRequest (method: string, path: string, options: ApiOptions, data: object = {}): Promise<object> {
    const apiContext = await request.newContext(options);

    let response: APIResponse;
    switch (method.toLowerCase()) {
      case 'get':
        response = await apiContext.get(path);
        break;
      case 'post':
        response = await apiContext.post(path, data);
        break;
      default:
        throw new Error(`Unhandled apiRequest method: ${method}`);
    }

    // Verify request success
    this.verifyStatus(response, 200);
    // Store response body as an object
    const body = await response.json() as object;
    // Clean up API context
    await apiContext.dispose();
    // Return the body object
    return body;
  }
}
