# Stock Viewer Portal

_A full stack application using React JS for the front end, Node JS for the back end and Mongo DB_

### Please make sure you familiarize yourself with mongo DB before proceeding [Documentation](https://docs.mongodb.com/manual/introduction)

### Once you setup a cluster make sure to whitelist your IP before starting the project

## Setup

1. Make sure [Node](https://nodejs.org/en/download/) is at v8.5.0 or above.
2. Make sure to to whitelist your IP before starting the project.
3. If yarn install fails run following command to bypass the browser restriction.

```
npm config set strict-ssl false
```

4. Run the following command to start concurrent build for backend and front end

```
yarn start:dev
```

5. In order to debug jest tests put a debugger statement in the test you are working with and run the following

```
node --debug-brk --inspect ./node_modules/.bin/jest -i --env jest-environment-node-debug
```

This will output a link which you can paste into the browser and start the debugger

6. Setup [git hooks](docs/setup.md#git-hooks) to keep the docs updated.

## Running the application

From the root folder run

```
npm start
```

## Learn

- [React](https://reactjs.org/)
- [Node](https://nodejs.org/en/docs/)
