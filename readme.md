## Precondition:

- nodejs
- lint
- prettier

## How to setup and run this project:

- Checkout source code
- Cd to source code folder:
  cd aa_api_playwright
- Run command line:
  yarn install
- Run testcase:
  yarn test
- View trace viewer to show log and api in each case like: npx playwright show-trace test-results/[trace-folder]/trace.zip
  npx playwright show-trace test-results/fixedAssetEvent-sale-validateSaleEvent-Validat-6faa7-on---Sale-fail-when-sold-amount-excise-is-empty-API-Testing-Playwright/trace.zip
- View report in local
  npx monocart show-report test-results/report.html

## How to set up new repo:

- mkdir playwright_folder
- cd playwright_folder
- yarn create playwright -> choose default option
- create .gitignore => add module for ignore update to github (later)
- remove test-example folder and tests/example.spec.js
- add new file \*\*test.ts in tests folder to create auto

## Script

- yarn add typescript
- yarn add dotenv
  Create .env
  Config to "playwright.config.js" for env
- add scripts to package.json
- yarn add allure-playwright
  config to "playwright.config.js" for allure
  brew install allure

## To run with docker

docker build -f ./Dockerfile -t playwrighttest .
docker run --network host --rm -v $(pwd):/home/app/ --entrypoint npm playwrighttest run test

## Lint

yarn run lint
yarn prettier --write .

## How to run in local environment

- Create .env.local file in env folder
- Run with command in local
  yarn test_local
