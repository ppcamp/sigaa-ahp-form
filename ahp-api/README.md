# API

### Project configs

To run this api in aws, I'm using [pm2](https://pm2.keymetrics.io/docs/usage/quick-start/), which is a
tool to manage node applications (as service handler).

```bash
# to check if is still running
pm2 status

# to check errors
pm2 logs ApiBackend --lines 100

# to restart
pm2 restart ApiBackend

# to create a new api (in root ahp-api folder)
pm2 start dist/main.js --name ApiBackend
```

The api use an action defined in github, which auto update the api code when detect some change

---

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
