# PolkadotJS / Edgeware Node User Rating App

[![TypeScript](https://img.shields.io/badge/--3178C6?logo=typescript&logoColor=ffffff)](https://www.typescriptlang.org)

A user rating application using the PolkadotJS API and the Edgeware Substrate Node.

Users can rate rate another user only once and cannot change rating and also see ratings of other users.

**This is a technical Assessment project.** This solution uses `Node.js` runtime, `React.js` for the UI, with `Styled Components` for styling, `Polkadot-JS API` easy-to-use wrappers around JSONRPC calls that flow from an application to a node.

## Dev accounts

```javascript
Alice;
Bob;
Charlie;
Dave;
Eve;
Ferdie;
```

## Requirements

Before getting started, make sure you have the following requirements:

- [Docker](https://www.docker.com)
- [Docker Compose](https://docs.docker.com/compose/) (Supporting compose file version 3)
- [Node.js](https://nodejs.org) (v16 or higher)
- [Yarn Package Manager](https://yarnpkg.com/)
- A [bash](https://www.gnu.org/software/bash) compatible shell

### Run The Project

Follow these steps to get your development environment set up:

1. **Clone this repository** locally;

```bash
# Change to the desired directory
$ cd <desired-directory>

# Clone the repo
$ git clone https://github.com/evanigwilo/user-rating.git

# Change to the project directory
$ cd user-rating
```

3. Start a substrate node in development mode

```bash
$ docker-compose up -d
```

4. Install dependencies

```bash
yarn install
```

5. Run app

```bash
yarn start
```

5. The web-app will be running at http://localhost:3000

## Useful commands

```bash
# Stops containers and removes containers, networks and volumes
$ docker-compose down -v
```

## References

> [Polkadot JS Docs](https://polkadot.js.org/docs/)

> [Substrate: The Blockchain Framework for a Multichain Future](https://substrate.io/)

> [Edgeware: A DAO-first smart contract platform for managing, funding, and building decentralized communities](https://www.edgeware.io/)
