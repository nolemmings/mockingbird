# mockingbird

A stand-alone express server which allows dynamically registering your mock request and consume it when it is called. This server allows you to build a fake backend without much overhead, complex mocking frameworks for your framework/language/whatever. Just start the server, make a request describing your expectation and run your actual test.

## Installation



## POST /expectation

```
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
  }
}
```

Run the following command:
```
curl -v -H "Content-Type: application/json" -X GET localhost:3000/user/123
```

Response:
```
{
  "id": "123",
  "name": "Johnny",
  "email": "my@email.org"
}
```
