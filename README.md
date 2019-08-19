# Mockingbird

A stand-alone express server which allows dynamically registering mock requests. This server allows you to build a fake backend without much overhead or complex mocking frameworks for your framework/language/whatever. Just start the server, make a request describing your expectation and run your actual test.

See [Mockingbird Client](https://github.com/nolemmings/mockingbird-client) for a JavaScript client library.

## Installation

```sh
yarn add -D @nolemmings/mockingbird
```

or

```sh
npm install @nolemmings/mockingbird
```

## Run

Start the server like a normal express server:

```js
var mockingbird = require('@nolemmings/mockingbird');

var server = mockingbird.listen(3000, function() {
  var port = server.address().port;
  console.log('App listening at http://localhost:%s', port);
});
```

## Create an Expectation

To register the requests triggered by your app and their desired response, you must create an expectation.

**Request:**

```text
POST /tests/eae37fb0/expectations

{
  "request": {
    "method": "post",
    "url": "/users/123",
    "body": {
      "some": "object"
    }
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

Set repeat to `-1` to repeat indefinitely.

Body is an optional param. Omitting the body ensures any request body is accepted.

**Response:**

```text
{
   "id": "7df3567b-3b84-4496-8df5-57506c51eabb",
   "testId": "eae37fb0",
   "request": {
      "method": "post",
      "url": "/users/123",
      "body": {
        "some": "object"
      }
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

When a request has been triggered the number of times defined in `repeat`, it will start returning a 404 with an error message.

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
      },
      "headers": {
        "X-RateLimit-Limit": "5000",
        "X-RateLimit-Remaining": "4999"
      }
   },
   "repeat": 3,
   "requestCount": 0
}
```

## Get all test expectations

Returns all expectations.

```text
GET /tests/eae37fb0
```

## Remove a Test

To delete all expectations for a specific test case simply run the following:

```text
DELETE /tests/eae37fb0
```

## Running a mock request

When you've registered an expectation, you can trigger it by simply calling the specified url and method.

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

Returns `429 Too Many Requests` when the request count is more than the specified number of repetitions. Returns `404 Not Found` when expectation could not be found.
