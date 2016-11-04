import 'babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import config from './config';
import postExpectation from './expectations/post-expectation';
import getExpectation from './expectations/get-expectation';
import getTest from './tests/get-test';
import cors from 'cors';
import deleteTest from './tests/delete-test';
import consumeExpectation from './expectations/consume-expectation';
import { default as log, requestLogger } from './logger';

const app = express();
app.use(requestLogger);
app.use(cors());

app.get('/tests/:testId/expectations/:id', bodyParser.json(), getExpectation);
app.post('/tests/:testId/expectations', bodyParser.json(), postExpectation);
app.get('/tests/:testId', bodyParser.json(), getTest);
app.delete('/tests/:testId', bodyParser.json(), deleteTest);

// Don't parse the body into an object at any time. Parsing it as text enables all
// usecases (json, x-www-form-urlencoded, etc.)
app.all('/tests/:testId/*', bodyParser.text({ type: '*/*' }), consumeExpectation);

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
