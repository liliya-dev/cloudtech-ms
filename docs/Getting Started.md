# Setup

Instructions on how to set up a new Engine project.

---

## Set up project in Github

Clone this repository and give it a new name.

Then add .env.development.

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=development
SANITY_STUDIO_API_DATASET=development
SANITY_STUDIO_API_PROJECT_ID=
SANITY_STUDIO_PREVIEW_SECRET=thinkofarandomstringoftext
SANITY_STUDIO_PROJECT_PATH=http://localhost:3000/
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=mawla
STORYBOOK_CLOUDINARY_CLOUD_NAME=mawla
SANITY_API_TOKEN=
```

### Add branches

Add a `production`, `development` and `client-staging` branch.

Make `development` the default branch.

---

## New Sanity project

### Create project

Run `sanity init` (or `npm install -g @sanity/cli && sanity init`) in an empty directory and follow the steps. This will create a project with a lot of files we won't use. We only need the project ID for now. Copy that to .env.development as `NEXT_PUBLIC_SANITY_PROJECT_ID` and `SANITY_STUDIO_API_PROJECT_ID`.

```bash
sanity init -y --project ProjectName --dataset development --output-path ./tmp-sanity-studio
```

### Add development dataset

```bash
sanity dataset create development --visibility public
sanity dataset create client-staging --visibility public
```

### Add CORS origin

Add http://localhost:3000 to CORS origins in the [Sanity manage dashboard](https://www.sanity.io/manage).

### Preview API token

Create a sanity api token for preview in the [Sanity manage dashboard](https://www.sanity.io/manage) and save it in .env.development as `SANITY_API_TOKEN`. (permission: viewer)

### Domains

Add the domains you will be using `*.vercel.app` to CORS origins as well.

### Create initial pages

Go to the CMS and create a homepage and 404 page.

---

## Run locally

By now you can run the project locally:

### Next.js frontend

First, run the development server:

```bash
> yarn
> yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Sanity CMS interface

Run Sanity local server to see the for CMS UI

```bash
> yarn cms
```

### Storybook

Run storybook locally to start working on modules statically.

```bash
> yarn storybook
```

---

## Sentry

Create a project in Sentry for error logging.

---

## Deploying to Vercel

Connect the Github project in Vercel using the above env vars through the Vercel interface. Add env vars at the start.

### Connect Sentry

⚠️ The first deployment will fail because it's not connected to Sentry.

1. Allow access in the Vercel organisation integrations dialog.
2. Connect Sentry project and Vercel project in https://sentry.io/settings/mawla/integrations/vercel/117885/
3. Redeploy in Vercel

### Add domains

Add `client-staging-xxx.vercel.app` (git branch 'client-staging') and `development-xxx.vercel.app` (git branch 'development') to the domains in Vercel https://vercel.com/mawla-team/frescocooks/settings/domains

### Add env vars

Now set the correct env vars on Vercel for the Sanity dataset.

`NEXT_PUBLIC_SANITY_DATASET=client-staging`
`SANITY_STUDIO_API_DATASET=client-staging`

`NEXT_PUBLIC_SANITY_DATASET=development`
`SANITY_STUDIO_API_DATASET=development`

---

# Start building

Run `yarn dev`, `yarn cms` and `yarn storybook` in three terminal tabs and start building.

- add favicons in `public/favicon` using https://realfavicongenerator.com
- add navigation items in cms
- add footer items in cms
- add config data in cms
- start creating custom page types `yarn create-page`
- start creating modules `yarn create-module`
- start creating heroes `yarn create-hero`

Later

- start creating dialogs `yarn create-dialog`
- start creating forms `yarn create-form`
