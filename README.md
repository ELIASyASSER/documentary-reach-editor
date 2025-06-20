This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# shadcn setup
npx shadcn@2.1.6 init  
npx shadcn@2.1.6 add --all
## tiptap installation
 - npm install @tiptap/react@2.10.2  @tiptap/pm@2.10.2  @tiptap/starter-kit@2.10.2 --legacy-peer-dep
 -  for all tiptap packages(table taskItem taskList headings ....) make sure to install 2.10.2 version and use --legacy-peer-deps
-  npm i tiptap-extension-resize-image@1.2.1 --legacy-peer-deps
-  $ npm i zustand@5.0.1 --legacy-peer-deps
-  $ npm install react-color --legacy-peer-deps
 $ npm install @tiptap/extension-highlight@2.10.2 --legacy-peer-deps
     npm install @tiptap/extension-link@2.10.2 --legacy-peer-deps

npm install @tiptap/extension-text-align@2.10.2 --legacy-peer-deps

npm install nuqs@2.2.3 --legacy-peer-deps this package for search params and functionalities optional
npm install convex --legacy-peer-deps data base and run npx convex dev 
npm install @clerk/nextjs --legacy-peer-deps
$ npm i react-icons
to enable organization go to clerck -> dashboard->organization and configure and enable it  
add this to jwt templates under claims => and save    "organization_id":"{{org.id}}"
start with liveblocks create acc for collaboration create new project after sign in
npm install @liveblocks/client@2.12.2 @liveblocks/react@2.12.2 @liveblocks/react-ui@2.12.2 @liveblocks/react-tiptap@2.12.2 --legacy-peer-deps
install failed dependencies  if you faile with liveblocks 
npm i @tiptap/extension-collaboration @2.10.2 --legacy peer-deps
npm i ..... failed files 
$ npm i y-protocols@1.0.6 --legacy-peer-deps
$ npm i @liveblocks/node@2.12.2 --legacy-peer-deps