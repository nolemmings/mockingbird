import 'babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import config from './config';
import postExpectation from './post-expectation';
import mockRequest from './mock-request';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/expectations', postExpectation, postExpectation);
app.all('*', mockRequest);

// Start server when module is not being require'd
if (!module.parent) {
  app.listen(config.get('port'));
}

export default () => {
  return app;
};
