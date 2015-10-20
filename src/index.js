/**
 * This file bootstraps mockingbird. It makes sure that Babel is registered,
 * which transpiles all subsequent imports from ES6/7 to ES5. Yes. NodeJS already
 * supports ES6. However, they don't support the full spec yet. Babel is more
 * powerful for now. In the future we might be able to get rid of Babel.
 *
 * So, this file is still ES5, all imports from here are processed by Babel, ES6.
 */

require('babel-core/register');

var app = require('./server')();
var config = require('./config');
var log = require('./logger');

// Start the ExpressJS server if not being require'd
var server = null;
if (!module.parent) {
  server = app.listen(config.get('port'), function() {
    log.info('Involve backend listening at http://%s:%s', server.address().address, server.address().port);
  });
}

module.exports = function() {
  return app;
}
