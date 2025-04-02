# Frontend Assignment 2025 - Guide to Hidden Gems

[เวอร์ชันภาษาไทย](./README.md)

In this assignment you have to create a web application "Guide to Hidden Gems". The main feature of the web application is "Guide", which is a collection of interesting and/or relevant restaurants that will make it easier for users to find restaurants that meet their needs.

You have 7 days to complete the assignment from the date you receive it via email.

## Prerequisites

You should prepare your development environment by following the checklist below.

- Your preferred choices of code editor (VS Code recommended)
- NodeJS version 20 or greater
  - It is recommended to install NodeJS using version manager, e.g. `nvm`
  - Enable `corepack` to run other package manager than the default one e.g. `pnpm` `yarn` by running the command `corepack enable` in the terminal

## Run project

We have already initialized all of the projects for you. The data-server is embedded inside the api-gateway project and will automatically be run when running the api-gateway.
For the api-gateway and web, it's your responsibility to develop both projects to ensure that all of them can be run successfully.

You have to develop api-gateway and web based on the given requirements above.
We will run the project you submitted by using this script.
Please make sure this script can run both projects at the root folder correctly.

1. Install all dependencies

   ```sh
   pnpm install
   ```

2. Run all projects

   ```sh
   pnpm run -r dev
   ```

## FAQ

### 1. What can be edited/modified in the project?

Everything can be edited/modified as long as you can meet the given requirements and the project can be run successfully.
