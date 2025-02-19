# Playwright Automation Template

A basic version of Playwright automated testing to jumpstart new projects

## Framework

### Linting

**Eslint** is being used for linting.

### Environmental Variables

**.env** file is being used to store environmental variables through the **dotenv** package

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
