import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import { renderToString } from 'react-dom/server'

import ViewStore from '../src/stores/ViewStore';

import DeltaStore from '../src/stores/DeltaStore';
import MoneyStore from '../src/stores/MoneyStore';
import MoneyApp from '../src/components/moneyApp.js';
import React from 'react';

const app = express();
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')))

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config');
const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

const renderFullPage = html => {
  return `
  <!doctype html>
  <html lang="utf-8">
    <head>
    </head>
    <body>
      <section id="money-game">${html}</section>
      <script src="/static/bundle.js"></script>
      <footer class="info">
      </footer>
    </body>
  </html>
  `
};

app.use(bodyParser.json());

app.get('/', function(req, res) {
  const moneyStore = new MoneyStore();
  const deltaStore = new DeltaStore();

  const initView = renderToString((
    <div>
      <MoneyApp moneyStore={moneyStore} deltaStore={deltaStore} />
    </div>
  ));

  const page = renderFullPage(initView);

  res.status(200).send(page);
});

// example of handling 404 pages
app.get('*', function(req, res) {
  res.status(404).send('Server.js > 404 - Page Not Found');
});

// global error catcher, need four arguments
app.use((err, req, res, next) => {
  console.error("Error on request %s %s", req.method, req.url);
  console.error(err.stack);
  res.status(500).send("Server error");
});

process.on('uncaughtException', evt => {
  console.log('uncaughtException: ', evt);
});

app.listen(3000, function(){
  console.log('Listening on port 3000');
});
