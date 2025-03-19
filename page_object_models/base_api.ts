import { APIResponse } from "@playwright/test";

export class BaseApi {
  readonly options: { [key: string]: string | { [key: string]: string}};

  constructor() {
    this.options = {};
  }

  /**
   * Verify the status code of an API response. Commonly used to verify a successful response with standardized error messaging.
   */
  verifyStatus (response: APIResponse, expectedStatus: number): void {
    if (response.status() !== expectedStatus) {
      throw new Error(`API did not return the expected status code ${expectedStatus}. Actual status code was ${response.status()}`);
    }
  }
}
