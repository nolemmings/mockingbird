import 'babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import config from './config';
import postExpectation from './post-expectation';
import getExpectation from './get-expectation';
import mockRequest from './mock-request';
import { default as log, requestLogger } from './logger';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Log request and response bodies using expressWinston
app.use(requestLogger);

app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Accept, Accept-Version, Content-Type, Api-Version, Origin, X-Requested-With, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE, PATCH');
  next();
});

app.get('/tests/:testId/expectations/:id', getExpectation);
app.post('/tests/:testId/expectations', postExpectation);
app.all('/tests/:testId/*', mockRequest);
app.all('*', (req, res) => {
  res.status(404).send({
    error: 'Page not found, make sure your request urls start with `/tests/:testId/...`',
  });
});

// Start server when not being require'd
if (!module.parent) {
  const server = app.listen(config.get('port'), () => {
    log.info(`App listening on ${server.address().port}`);
  });
}

export default app;
