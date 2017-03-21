## Intro

this is a demo source code for tech talk 2017/03/22. demostrating the cutting-edge way to do an nodejs server including:

* test-driven
* all es6 features -- mostly async function pattern
* the next version of koa
* middlewares and routers stack
* ORM and mocked data/service
* flow

check each commit for more detail

1. [setup the first router](../../commit/a959941)
2. [first orm model](../../commit/4bceb47)
3. [better error handling](../../commit/dc644d7)
4. [authenticate middleware](../../commit/9b40dc8)
5. [create account. mock objects](../../commit/976b748)
6. [add relationship between models](../../commit/cf268d3)


## Setup Envionment

### my local tools versions (or npm installed globally)

* `git v2.10.1`
* `node v7.4.0`
* `cnpm v4.4.2`
* `babel-node v6.18.0`
* `mocha v3.2.0`
* `mysql v5.7.17`
* `direnv v2.10.0`

### my local envirionment (`.envrc`)

```
export PORT=3000
export AUTH_SECRET=ilabs-intro
export MYSQL_DB=ilabs
export MYSQL_USERNAME=rexsheng
export MYSQL_PASSWORD=
export MYSQL_HOST=localhost
export MAIL_ACCOUNT=(your account)
export MAIL_PASSWORD=(your password)
```

### get started

```bash
git init
npm init
```

### install babel (presets and plugins)

```bash
cnpm i -D babel-core babel-loader babel-polyfill babel-preset-es2015 babel-preset-stage-0
cnpm i -D babel-plugin-transform-flow-strip-types babel-plugin-transform-runtime
```

your `.babelrc` should look like:

```json
{
  "presets": ["es2015", "stage-0"],
  "plugins": [
    "transform-runtime",
    "transform-flow-strip-types"
  ]
}
```

### plan to use koa2 for http service, sequelize for ORM, jwt for authenticate, and we do test-driven develop.

```bash
cnpm install koa@latest koa-body@next koa-router@next --save
cnpm install boom jsonwebtoken --save
cnpm install sequelize --save
cnpm install chai sqlite3 sequelize-fixtures superagent --save-dev
```

### setup mysql & sqlite3

```bash
mysql> create database ilabs;
mysql> grant all on ilabs.* to ''@'localhost';
```

### setup fixtures.yml for test

_(start playing)_

