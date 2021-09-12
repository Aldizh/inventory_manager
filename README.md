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

5. Install mongodb client and start the daemon in order to run the test suite

```
brew install mongodb-community@4.4
mongod --dbpath /usr/local/var/mongodb
```

6. In order to debug jest tests put a debugger statement in the test you are working with and run the following

```
node --debug-brk --inspect ./node_modules/.bin/jest -i --env jest-environment-node-debug
```

This will output a link which you can paste into the browser and start the debugger

7. Setup [git hooks](docs/setup.md#git-hooks) to keep the docs updated.

## Package maintenance

Some helpful yarn tools to maintain dependencies

- For checking any security flaws with past versions
  ```
  yarn audit
  ```
- And then to add a newer version of the related package
  ```
  yarn add package@new_version
  ```
- Be sure to commit `yarn.lock` file to help other collaborators

## Learn

- [React](https://reactjs.org/)
- [Node](https://nodejs.org/en/docs/)
