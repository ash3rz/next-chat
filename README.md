# next-chat
A chat app built with React, Material-UI, Socket.io, and NextJS.

I noticed the increased popularity in communication applications due to covid, so I thought I'd try to build my own sample project for fun.

![](/public/SignIn.png)

![](/public/Chat.png)

## Features

* Assigned [RoboHash](https://robohash.org/) avatar based on the chosen nickname
* You can pick a color to assign to your nickname in chat (similar to Discord)
* Chat message history is saved (up to a limit) locally by the server
* Users are notified when others enter or leave the chat
* Users can see when you're typing and when you stop typing - designated by the glowing green dot by your name
* Docker support


## Local Setup

### Install the dependencies

```
npm install
```

### Run Storybook

I like to use Storybook for initially iterating on components.  Running Storybook is entirely optional.

```
npm run storybook
```

If Storybook doesn't open a browser automatically, you can navigate to `http://localhost:6006` to view it.


### Run the dev server

```
npm run start
```

View the app in a browser at `http://localhost:3000`.


### Run a production build

```
npm run build
npm run start
```

View the app in a browser at `http://localhost:3000`.

## Docker Setup

```
docker build -t next-chat .
docker run -p 3000:3000 next-chat
```

View the app in a browser at `http://localhost:3000`.
