<img src="./public/icon.png" width="128">

# Family Dashbord

The web application is written in Next.js for managing Eviloma Family user subscriptions

## Tech Stack

![JavaScript](https://img.shields.io/badge/-javascript-000000?style=for-the-badge&logo=JavaScript&logoColor=F7DF1E)
![TypeScript](https://img.shields.io/badge/-TypeScript-000000?style=for-the-badge&logo=TypeScript&logoColor=3178C6)

![React.js](https://img.shields.io/badge/-react-000000?style=for-the-badge&logo=React&logoColor=61DAFB)
![Next.js](https://img.shields.io/badge/-Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=FFFFFF)
![Next.js](https://img.shields.io/badge/-TailwindCSS-000000?style=for-the-badge&logo=TailwindCSS&logoColor=06B6D4)
![NextAuth](https://img.shields.io/badge/-NextAuth-000000?style=for-the-badge&logo=&logoColor=FFFFFF)

![MongoDB](https://img.shields.io/badge/-MongoDB-000000?style=for-the-badge&logo=MongoDB&logoColor=47A248)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGODB_URI` - MongoDB connect url

`TELEGRAM_APIKEY` - API key for auth telegram bot

`NEXT_PUBLIC_TELEGRAM_URL` - Link to Telegram bot

`API_KEY_ID` - API key for ID system

`NEXT_PUBLIC_ID_URL` - Url ID system

`NEXT_PUBLIC_TELEGRAM_TOKEN` - Telegram bot token for notification

`INNGEST_SIGNING_KEY` - Key from inngest service from cron (auto setup on vercel)

`INNGEST_EVENT_KEY` - Event key from inngest service from cron (auto setup on vercel)

`NEXT_PUBLIC_RECAPTCHA_SITE_KEY` and `RECAPTCHA_SECRET_KEY` - Google ReCaptcha v3 keys

## Run Locally

Clone the project

```bash
  git clone https://github.com/HighError/FamilyDashboard
```

Go to the project directory

```bash
  cd FamilyDashboard
```

Install dependencies

```bash
  yarn
```

Setup .env

Start the server

```bash
  yarn dev
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
