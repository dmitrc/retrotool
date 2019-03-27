### How to setup?

* Pull global dependencies
  
```
npm i -g webpack http-server nodemon
```

* Pull client dependencies

```
cd client
npm i
```

* Pull server dependencies

```
cd server
npm i
```

* Edit server configuration
  
```
cd server
cp config.example.js config.js
<edit config.js>
```

### How to start?

#### Just client

(_Note: HTTP server is optional, but preferred since it is needed for React Dev Tools to work_)

* With hot reload (_dev mode_)

```
cd client
webpack --watch
http-server ./ -p 8080 -c-1 --cors
```

* Build once and serve

```
cd client
webpack --build
http-server ./ -p 8080 -c-1 --cors
```

#### Just server

* With hot reload (_dev mode_)

```
cd server
nodemon --watch index.js
```

* Start normally
```
cd server
node index.js
```

#### Both at once
(_starts all 3 (webpack, server, HTTP server) in dev mode_)

```
start start.bat
```