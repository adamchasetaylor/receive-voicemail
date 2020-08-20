# receive-voicemail

Envrionment variables must be configured in your .env file.

ACCOUNT_SID=

AUTH_TOKEN=

SENDGRID_API_KEY=

TO_EMAIL_ADDRESS=

FROM_EMAIL_ADDRESS=

## Pre-requisites

[twilio-cli](https://github.com/twilio/twilio-cli)

[plugin-serverless](https://github.com/twilio-labs/plugin-serverless)

## Local Setup

cd receive-voicemail

npm install

## Local Testing

npx twilio-run .

## To Deploy

twilio serverless:deploy
