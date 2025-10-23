import { APIResponse, request } from "@playwright/test";

/**
 * Configuration options for creating an API context with Playwright.
 * Corresponds to request.newContext() parameters.
 */
export interface ApiOptions {
  /** Base URL for all API requests */
  baseURL: string;

  /** Optional HTTP headers, commonly used for authorization tokens */
  extraHTTPHeaders?: { Authorization: string };

  /** Optional basic auth credentials */
  httpCredentials?: { username: string; password: string };
}

/**
 * Base class for API interaction.
 * Handles HTTP requests, status verification, and context cleanup.
 * Extend this class to implement endpoint-specific APIs.
 */
export class BaseApi {
  /** API configuration options */
  readonly options: ApiOptions;

  constructor() {
    this.options = {
      baseURL: ''
    };
  }

  /**
   * Verify that an API response has the expected HTTP status code.
   * Throws an error if the status does not match.
   *
   * @param response - Playwright APIResponse object from a request
   * @param expectedStatus - The expected HTTP status code (e.g., 200)
   */
  verifyStatus(response: APIResponse, expectedStatus: number): void {
    if (response.status() !== expectedStatus) {
      throw new Error(
        `API did not return the expected status code ${expectedStatus}. ` +
        `Actual status code was ${response.status()}`
      );
    }
  }

  /**
   * Make a generic API request.
   * Handles HTTP method selection, status verification, and context disposal.
   * Returns the parsed JSON body typed as T.
   *
   * @template T - Type of the expected JSON response body
   * @param method - HTTP method, e.g., "get" or "post"
   * @param path - API endpoint path relative to baseURL
   * @param options - API configuration options
   * @param data - Optional payload for POST requests
   * @returns Promise resolving to typed response body
   */
  async apiRequest<T = object>(
    method: string,
    path: string,
    options: ApiOptions,
    data: object = {}
  ): Promise<T> {
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

    // Ensure the response returned the expected status
    this.verifyStatus(response, 200);

    // Extract the response body and type it
    const body = (await response.json()) as T;

    // Dispose of the API context to free resources
    await apiContext.dispose();

    return body;
  }
}
