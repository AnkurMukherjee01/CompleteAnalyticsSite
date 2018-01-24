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
  if(req.body.workexp){
    messageBody += '\n\n Work Experience: ' + req.body.workexp;
  }
  if(req.body.noOfPostions){
    messageBody += '\n\n No Of Positions: ' + req.body.noOfPostions;
  }
  if(req.body.company){
    messageBody += '\n\n Company: ' + req.body.company;
  }
  if(req.body.position){
    messageBody += '\n\n Position: ' + req.body.position;
  }
  messageBody += '\n\n Subject :' + req.body.subject;
  messageBody += '\n\n Message: ' + req.body.message;
  if(req.body.courseName){
    messageBody += '\n\n Course Name Downloaded: ' + req.body.courseName;
  }

  var mailSubject = '';
  switch(req.body.type){
    case 'contact':
      mailSubject = 'Message from Website';
      break;
    case 'corporateTraining': 
      mailSubject = 'Corporate Training Message from Website';
      break;
    case 'employer':
      mailSubject = 'Employer Message from Website';
      break;
    case 'instructor':
      mailSubject = 'Instructor Message from Website';
      break;
    case 'download_PDF':
      mailSubject = 'Downloaded PDF from Website';
      break;
    case 'join_course':
      mailSubject = 'Join Course Message';
      break;
    case 'project':
      mailSubject = 'Project Message';
      break;
    default:
      mailSubject = 'Message from Website';
  }

  transporter.sendMail({
    from: config.mailUser,
    to: config.mailUser,
    subject: mailSubject,
    text: messageBody,
    auth: {
        user: config.mailUser,
        refreshToken: config.refreshToken,
        accessToken: config.accessToken,
        expires: 3600
    }
  }, (err, info) => {
    if(err){
      return res.sendStatus(400);
    }else{
        return res.sendStatus(200);
    }
  });
});

app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

app.get('*', (req, res) => {
  res.render('index', { req });
});

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}!`);
});
