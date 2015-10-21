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
POST /tests/eae37fb0/expectations

{
  "request": {
    "method": "get",
    "url": "/users/123"
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
   "id": "7df3567b-3b84-4496-8df5-57506c51eabb",
   "testId": "eae37fb0",
   "request": {
      "method": "get",
      "url": "/users/123"
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
   "requestCount": 0
}
```

When a request has been triggered the number of times defined in `repeat` it will start returning a 404 with an error message.

## Retrieve an Expectation

To get the latests details about an expectation you can retrieve it as follows:

**Request:**
```text
GET /tests/eae37fb0/expectations/7df3567b-3b84-4496-8df5-57506c51eabb
```

**Response:**
```text
{
   "id": "7df3567b-3b84-4496-8df5-57506c51eabb",
   "testId": "eae37fb0",
   "request": {
      "method": "get",
      "url": "/users/123"
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
   "requestCount": 0
}
```

## Running a mock request

When you've registered an expectation you can trigger it by simply calling the specified url and method.

**For example:**
```sh
curl -v -H "Content-Type: application/json" -X GET localhost:3000/users/123
```

**Response:**
```json
{
  "id": "123",
  "name": "Johnny",
  "email": "my@email.org"
}
```
