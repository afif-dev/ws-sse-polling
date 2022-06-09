# WebSocket, Socket.io, Server-Sent Events(SSE), Regular & Long Polling

Basic example of WebSocket, Socket.io, Server-Sent Events(SSE), regular &amp; long polling

## Setup for Local Development

1. WebSocket [dir: /websocket](/websocket)

```
node app.js
```

2. Socket.io [dir: /socketio-chat](/socketio-chat)

```
node app.js
```

3. Server-Sent Events (SSE) [dir: /server-sent-events](/server-sent-events)
```
node server.js
```

4. Regular Pooling [dir: /long-polling](/long-polling)
```
npm install -g browser-sync
browser-sync start --server --files "./"
```

5. Long Polling [dir: /long-polling](/long-polling)
```
go run main.go
```

> For automatically reload application, recommend to use [nodemon](https://nodemon.io/), [fresh](https://github.com/gravityblast/fresh)

## Screenshot
![](/websocket-ss.jpg)
![](/socketio-chat-ss.jpg)
![](/sse-ss.jpg)
![](/regular-polling-ss.jpg)
![](/long-polling-ss.jpg)

## Reference Links

- https://socket.io/
- https://javascript.info/websocket
- https://javascript.info/long-polling
- https://javascript.info/server-sent-events
- https://gofiber.io/
- https://github.com/LdDl/fiber-long-poll
- https://expressjs.com/
- https://github.com/websockets/ws
- https://www.fastify.io/
- https://github.com/lolo32/fastify-sse
- https://materializecss.com/
- https://browsersync.io/
- https://nodemon.io/
- https://github.com/gravityblast/fresh
