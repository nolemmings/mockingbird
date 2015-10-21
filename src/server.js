import 'babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import config from './config';
import postExpectation from './post-expectation';
import mockRequest from './mock-request';
import log from './logger';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/expectations', postExpectation);
app.all('*', mockRequest);

// Start server when not being require'd
if (!module.parent) {
  const server = app.listen(config.get('port'), () => {
    log.info(`App listening on ${server.address().port}`);
  });
}

export default app;
