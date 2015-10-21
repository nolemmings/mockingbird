# mockingbird

A stand-alone express server which allows dynamically register a mock request and consume them when called. This server allows you to build a fake backend without much overhead, complex mocking frameworks for your framework/language/whatever. Just start the server, make a request describing your expectation and run your actual test.

## Installation

```sh
npm install @nolemmings/mockingbird
```

## Run

Start the server like a normal express server:
```javascript
var mockingbird = require('@nolemmings/mockingbird');

var server = mockingbird.listen(3000, function() {
  var port = server.address().port;
  console.log('App listening at http://localhost:%s', port);
});
```

## Create an Expectation

To register which requests you want to trigger and what response you'd like to have returned you must create an expectation.

**Request:**
```text
POST /expectation

{
  "request": {
    "method": "get",
    "url": "/user/123"
  },
  "response": {
    "status": 200,
    "body": {
      "id": "123",
      "name": "Johnny",
      "email": "my@email.org"
    }
  },
  "repeat": 3
}
```

**Response:**
```text
{
   "request": {
      "method": "get",
      "url": "/user/123"
   },
   "response": {
      "status": 200,
      "body": {
         "id": "123",
         "name": "Johnny",
         "email": "my@email.org"
      }
   },
   "repeat": 3,
   "requested": 0
}
```

## Running a mock request

When you've registered an expectation you can trigger it by simplt calling the specified url and method.

**For example:**
```sh
curl -v -H "Content-Type: application/json" -X GET localhost:3000/user/123
```

**Response:**
```json
{
  "id": "123",
  "name": "Johnny",
  "email": "my@email.org"
}
```
