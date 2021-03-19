# Bandly Server

## list of Endpoints
```
- POST /register
- POST /login
- POST /users
- GET /users/bandId
```

## RESTfull Endpoint

### POST /register

Request
```json
{
  "name": "String",
  "email": "String",
  "password": "String",
  "accountType": "String"
}
```

Response
```json
- status: 201
{
  "id": "Integer",
  "name": "String",
  "email": "String",
  "accountType": "String"
}
```

### POST /login

Request
```json
{
  "email": "String",
  "password": "String"
}
```

Response
```json
- status: 200
{
  "id": "Integer",
  "email": "String",
  "access_token": "String",
  "accountType": "String"
}
```

### POST /users

Request
```json
{
  "name": "String",
  "description": "String",
  "location": "String",
  "genre": ["String"],
  "rate": "Integer"
}
```

Response
```json
- status: 201
{
  "band": {
    "id": "integer",
    "userId": "integer",
    "name": "String",
    "description": "String",
    "location": "String",
    "rate": "integer"
  }
}
```

