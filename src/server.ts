import 'reflect-metadata';
import 'zone.js/dist/zone-node';
import { renderModuleFactory } from '@angular/platform-server'
import { enableProdMode } from '@angular/core'
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { join } from 'path';
import { readFileSync } from 'fs';
const config = require('./config')
const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
      type: 'OAuth2',
      clientId: config.clientId,
      clientSecret: config.clientSecret
  }
});
enableProdMode();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

const app = express();

const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();
const { AppServerModuleNgFactory } = require('main.server');

app.engine('html', (_, options, callback) => {
  const opts = { document: template, url: options.req.url };

  renderModuleFactory(AppServerModuleNgFactory, opts)
    .then(html => callback(null, html));
});

app.set('view engine', 'html');
app.set('views', 'src')

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/api/message', (req, res) => {
  if (!req.body) return res.sendStatus(400);

  var messageBody = 'You have received a message.';
  messageBody += '\n\n Name: ' + req.body.name;
  messageBody += '\n\n Email: ' + req.body.email;
  messageBody += '\n\n Phone No: ' + req.body.phoneNo;
  messageBody += '\n\n Subject :' + req.body.subject;
  messageBody += '\n\n Message: ' + req.body.message;
  
  transporter.sendMail({
    from: 'sriram.thiagarajan94@gmail.com',
    to: 'sriram.thiagarajan94@gmail.com',
    subject: 'Message from Website',
    text: messageBody,
    auth: {
        user: 'sriram.thiagarajan94@gmail.com',
        refreshToken: config.refreshToken,
        accessToken: config.accessToken,
        expires: 3600
    }
  });

  return res.sendStatus(200);
});

app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

app.get('*', (req, res) => {
  res.render('index', { req });
});

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}!`);
});
