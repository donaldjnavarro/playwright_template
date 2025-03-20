import { test, expect } from '../../hooks.ts';
import { OpenAIApi } from '../../page_object_models/openai_api.ts';
import { PostmanApi } from '../../page_object_models/postman_api.ts';
import { Serializable } from "playwright-core/types/structs";
import { config } from 'dotenv';
import { env } from 'node:process';
config({ path: './.env' });

test.describe('Example tests using API calls', { tag: ['@apiExamples']}, () => {

  test('Example API GET request using API key', { tag: ['@apiOpenAIGet'] }, async () => {
    test.skip(env.CI?.toLowerCase() === 'true', 'Skip this test in CICD pipeline for lack of required secrets');

    const openAIApi = new OpenAIApi();
    const body = await openAIApi.getModels();

    expect(typeof body).toBe('object');
    expect(Object.keys(body).length, 'Expect the API response to include object keys')
      .toBeGreaterThan(0);

    // Verify response data
    const modelList = body.data as Serializable[];
    expect(modelList.length, 'Expect the API response to include a list of language models')
      .toBeGreaterThan(0);

  });

  test('Example API GET request using Basic Auth', { tag: ['@apiPostmanGet'] }, async () => {
    test.skip(env.CI?.toLowerCase() === 'true', 'Skip this test in CICD pipeline for lack of required secrets');

    const postmanApi = new PostmanApi();
    const body = await postmanApi.getBasicAuth();

    expect(typeof body, 'Expect API response to be an object')
      .toBe('object');
    expect(Object.keys(body).length, 'Expect API response to include keys')
      .toBeGreaterThan(0);

    expect(body.authenticated, 'Expect Postman response to include \'authenticated\' key')
      .toBe(true);
  });

  test('Example API POST request using Basic Auth', { tag: ['@apiPostmanPost'] }, async () => {
    test.skip(env.CI?.toLowerCase() === 'true', 'Skip this test in CICD pipeline for lack of required secrets');

    const postmanApi = new PostmanApi();
    const testData = { test: 'lorem ipsum' };
    const body = await postmanApi.postExample(testData);

    expect(typeof body, 'Expect API response to be an object')
      .toBe('object');
    expect(Object.keys(body).length, 'Expect API response to include keys')
      .toBeGreaterThan(0);
    expect(body.data, 'Expect Postman response to include test data sent with the POST request').toEqual(testData);
  });

});
