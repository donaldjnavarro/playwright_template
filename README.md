# Playwright Automation Template

A basic version of Playwright automated testing to jumpstart new projects

## Framework

### Linting

**Eslint** is being used for linting.

### Environmental Variables

* **.env** file is being used to store environmental variables through the **dotenv** package
* Some variables will need to be stored in Github Settings > Secrets in order for the Github Actions CI to succeed

## Setup

1. Run `npm install`
2. Create **.env** file based on the **.env.template** file

## Usage

Common commands can be found in the **package.json** file's `scripts`

### Headless Browsers

By default tests will run in headless browsers, meaning the browser will not be rendered on your screen.

To turn this off, add `HEADLESS=false` to your **.env** file

### Debugging: VS Code

Visual Studio Code debugging is already supported. See the **.vscode/launch.json** file to further configure it, such as customizing the playwright command that it runs

### Running tests

#### Running tests by tag

If a test is given a tag `{ tag: '@nameOfTag' }` then we can run only the tests with a given tag.

Command syntax: `npx playwright test --grep '@nameOfTag'`

### Running tests in parallel

The .env file provides an option `PARALLEL=` that can be set to true in order to have tests run in parallel. Note that this should be used with care, considering whether a given product and set of tests can overlap without interfering with each other within the app they are testing.

#### Viewing test results

After a test is finished running, its results will be saved.

* View the test results by using the command: `npx playwright show-report`

#### Viewing details: Traces

If you turn on Tracing, then after a test is run there will be a recording of the test saved. This recording includes the DOM and screenshots of the test at each step of its run.

* There are multiple ways to turn tracing on. One example is when running the tests include `--trace on`
* If Tracing was on during the test, then the test report will include a section with the trace
