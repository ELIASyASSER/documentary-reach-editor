# 📄 Documentary – Rich Text Editor Platform (Google Docs Clone)
## Description

A collaborative, feature-rich document editing platform inspired by Google Docs. Built using Next.js, Tiptap, Convex, Clerk, and Liveblocks, 

this project supports real-time collaboration, 

organization-based document access, text formatting, tables, comments, image resizing, and more.

This full-stack web app demonstrates advanced use of React, serverless data architecture, live multi-user editing, authentication, and dynamic 

UI design with shadcn/ui and Tailwind CSS.

### 🔧 Key Features:

✍️ Real-time collaborative editing using Liveblocks and Tiptap

🖼️ Rich text editor supporting tables, highlights, image resizing, task lists, and more

🧠 Persistent document storage with Convex database

🔐 Authentication and organization support with Clerk

🎨 Modern and responsive UI built with shadcn/ui and Tailwind CSS

🧭 Custom search params management via nuqs

🗂️ Multi-user document access and editing permissions

🧩 State management with Zustand

## Live Demo 
[Documentary](https://documentary-reach-editor.vercel.app/)

# how to use 
fork the repo 
```
bash
open your cmd and cd c:
git clone <url>
cd docs
npm install --legacy-peer-deps
 rename **.env.example** to .env.local
and paste your variales  
```
to get these variables you need to create accounts on 

[Clerk](https://clerk.com)

[liveblocks](https://liveblocks.io)

[convex](https://www.convex.dev)

## this is detailed setup if you face an issues make sure to use exact version i use**
``` 
# shadcn setup
npx shadcn@2.1.6 init  
npx shadcn@2.1.6 add --all
```
## tiptap installation
 ```
  npm install @tiptap/react@2.10.2  @tiptap/pm@2.10.2  @tiptap/starter-kit@2.10.2 --legacy-peer-dep
   for all tiptap packages(table taskItem taskList headings ....) make sure to install 2.10.2 version and use --legacy-peer-deps
  npm i tiptap-extension-resize-image@1.2.1 --legacy-peer-deps
   npm i zustand@5.0.1 --legacy-peer-deps
   npm install react-color --legacy-peer-deps
  npm install @tiptap/extension-highlight@2.10.2 --legacy-peer-deps
 npm install @tiptap/extension-link@2.10.2 --legacy-peer-deps

npm install @tiptap/extension-text-align@2.10.2 --legacy-peer-deps
 npm i react-icons

```
## convex setup
```
npm install convex --legacy-peer-deps data base and run npx convex dev
get your public key from convex ->dashboard-> project

to see logs and if there are any issues with your database  add new terminal `cd docs` run `npm convex dev` 
```
## clerk setup
```
npm install @clerk/nextjs --legacy-peer-deps
to enable organization go to clerck -> dashboard->organization and configure and enable it  
add this to jwt templates under claims => and save    "organization_id":"{{org.id}}"
```

## live blocks setup
```
start with liveblocks create acc for collaboration create new project after sign in

npm install @liveblocks/client@2.12.2 @liveblocks/react@2.12.2 @liveblocks/react-ui@2.12.2 @liveblocks/react-tiptap@2.12.2 --legacy-peer-deps

install failed dependencies  if you faile with liveblocks 

npm i @tiptap/extension-collaboration @2.10.2 --legacy peer-deps

npm i ..... failed files 
npm i y-protocols@1.0.6 --legacy-peer-deps
npm i @liveblocks/node@2.12.2 --legacy-peer-deps
```
**after installing all dependecies** 
run `npm run dev` open `localhsot:3000 `
enjoy (_-_) 
## How to deploy on vercel
after creating a project on vercel 
**make convex production insted of development**

**best practice follow convex docs >deploy on vercel because this command might be changed**
### override build command
override build command and paste `npx convex deploy --cmd 'npm run build'`
### evironment variables
GET YOUR `CONVEX_DEPLOY_KEY`  from convex > dashboard>settings>generate production deploy key >call it any name 
and copy your key
add these variables too
**go to liveblocks >api keys >generate secrect api key**
CONVEX_DEPLOYMENT=<convex will do this> # team: elias-yasser, project: docs-87c2e
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<get from clerk>
CLERK_SECRET_KEY=<get from clerk>
LIVEBLOCKS_SECRET_KEY=<get from live blocks >

## override install command
 #### got to your project settings override install command make it
`npm install --legacy-peer-deps` 
finally deploy  if *deployment failed* make it 
`bun install`


