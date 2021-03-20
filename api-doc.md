# Bandly Server

## list of Endpoints
```
- POST /register
- POST /login
- GET /users
- GET /bands
- GET /bands/:id
- POST /bands
- PUT /bands
- POST /portofolio
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
  "access_token": "String",
}
```

### GET /users (GET user by Id)

Request
```json
- headers: access_token string
```

Response
```json
- status: 200
{
  "id":"Integer",
  "email":"String",
  "accountType":"String"
}
```


### GET /bands (find all bands)

Request
```json
```

Response
```json
- status: 200
{
  "bands": [
    {
      "id": "Integer",
      "name": "String",
      "location": "String",
      "description": "String",
      "rate": "Integer",
      "UserId": "Integer",
      "Genre": [
        {
          "id": "Integer",
          "name": "String",
          "BandGenre": {
            "BandId": "Integer",
            "GenreId": "Integer",
          }
        }
      ]
    }
  ]
}
```

### GET /bands/:id (find band by id)

Request
```json
- params: id integer
```

Response
```json
- status = 200
{
  "id": "Integer",
  "name": "String",
  "UserId": "Integer",
  "location": "String",
  "description": "String",
  "rate": "Integer",
  "Genres": [
      {
        "id": "Integer",
        "name": "String",
        "BandGenre": {
          "BandId": "Integer",
          "GenreId": "Integer"
        }
      }
    ]
}
```


### POST /bands (create band)

Request
```json
- headers: access_token string
{
  "name": "String",
  "location": "String",
  "description": "String",
  "genre": ["Integer"],
  "rate": "Integer"
}
```

Response
```json
- status = 201
{
  "band": {
    "id": "Integer",
    "name": "String",
    "location": "String",
    "description": "String",
    "rate": "Integer",
    "UserId": "Integer",
    "genre": [
      {
        "BandId": "Integer",
        "GenreId": "Integer"
      }
    ]
  }
}
```

### PUT /bands (update band profile)

Request
```json
- headers = access_token string
{
  "name": "String",
  "location": "String",
  "description": "String",
  "genre": ["Integer"],
  "rate": "Integer"
}
```

Response
```json
- status = 200
{
  "message": "Profile update success"
}
```


### POST /portofolio (unggah portofolio)

Request
```json
- headers = access_token string
```

Response
```json
```

