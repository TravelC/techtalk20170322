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

_(setup fixtures.yml for test)_

### [#1] first router
### first orm model
