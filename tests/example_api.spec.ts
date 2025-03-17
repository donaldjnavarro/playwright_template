import { test, expect } from '../hooks.ts';
import { APIResponse } from "@playwright/test";
import { Serializable } from "playwright-core/types/structs";
import { config } from 'dotenv';
import { env } from 'node:process';
config({ path: './.env' });

test.describe('Example tests using API calls', { tag: ['@api', '@debug']}, () => {

  test('Example API GET request using API key', async ({ playwright }) => {
    // Define API request parameters
    const host = 'https://api.openai.com/v1/';
    const path = 'models';
    const apiKey = env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error(`API Key needed for GET request is missing. Need authentication for ${host}`);
    }

    // Create API context
    const apiContext = await playwright.request.newContext({
      baseURL: host,
      extraHTTPHeaders: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    const response: APIResponse = await apiContext.get(path);

    // Verify API response Status Code
    expect(response.status(), 'Expect the API response to be 200')
      .toBe(200);

    // Verify API response JSON body
    const body = await response.json() as { data: Array<string> };
    expect(typeof body).toBe('object');
    expect(Object.keys(body).length, 'Expect the API response to include object keys')
      .toBeGreaterThan(0);

    // Verify response data
    const modelList = body.data as Serializable[];
    expect(modelList.length, 'Expect the API response to include a list of language models')
      .toBeGreaterThan(0);

    // Teardown
    await apiContext.dispose();
  });

  test('Example API GET request using Basic Auth', async ({ playwright }) => {

    // Define API request parameters
    const host = 'https://postman-echo.com/';
    const path = 'basic-auth';
    const username = env.POSTMAN_API_USERNAME;
    const password = env.POSTMAN_API_PASSWORD;
    if (!username || !password) {
      throw new Error(`Auth needed for GET request is missing. Need authentication for ${host}`);
    }

    // Create API context
    const api = await playwright.request.newContext({
      baseURL: host,
      httpCredentials: { username, password }
    });
    const response: APIResponse = await api.get(path);

    // Verify API response Status Code
    expect(response.status()).toBe(200);

    // Verify API response JSON body data
    const body = await response.json() as { authenticated: boolean };
    expect(typeof body, 'Expect API response to be an object')
      .toBe('object');
    expect(Object.keys(body).length, 'Expect API response to include keys')
      .toBeGreaterThan(0);

    expect(body.authenticated, 'Expect Postman response to include \'authenticated\' key')
      .toBe(true);

    // Teardown
    await api.dispose();
  });

});
