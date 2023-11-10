# SvelteKit Dashboard

This is Johnny's take on the [free Nextjs to SvelteKit](https://johnnify.com/learn/nextjs-to-sveltekit) course, which is a take on [Next/Learn](https://nextjs.org/learn) but implementing with SvelteKit!

## Livestreams

See Johnny develop this app [live on his channel](https://www.youtube.com/@johnnifytech):

- [Overview & Chapters 1-5, including View Transitions!](https://www.youtube.com/watch?v=0o1tqcui1k8)
- [Chapters 6-10, including custom chart with Chart.JS!](https://www.youtube.com/watch?v=jKehybNqzio)

## Setup

Before anything, install dependencies with:

```bash
pnpm install
```

You will need a version of Node for that command to work correctly. This project uses [Volta](https://volta.sh/), which will automatically switch to the correct version of Node for you!

## Developing

Start a development server with:

```bash
pnpm run dev
```

## Environment Variables

You will need a set of environment variables for this app to work correctly. You can copy `.env.example` into your `.env` file, and substitute the mock values as needed.

## Database

You will need a Postgres database for this app to work correctly. The typesafe ORM + Migrator of choice for this project is [Prisma](https://www.prisma.io/), and you can use `pnpx prisma migrate reset` to reset your connected database, realign its schema and seed it with some sample data.

Note that [the seed script needs Bun](https://bun.sh/), so make sure you have that installed!
