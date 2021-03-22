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

- POST /bands/portofolio
- GET /bands/portofolio/:bandId
- DELETE /bands/portofolio/:id
- POST /bands/portofolio/url

- GET /transactions/:bandId
- GET /transactions
- PATCH /transactions/:id

- GET /genres
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
      "imageUrl": "string",
      "coverUrl": "string",
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
  "imageUrl": "string",
  "coverUrl": "string",
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
- imageUrl: imageUrl.jpeg
- coverUrl: coverUrl.jpeg
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
- imageUrl = imageUrl.jpeg
- coverUrl = coverUrl.jpeg
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


### POST /bands/portofolio (unggah portofolio)

Request
```json
- headers = access_token string
- file = file.mp4
```

Response
```json
- status : 201
{
  "fileUrl": "String",
  "portofolioType": "String",
  "BandId": "Integer",
  "id": "integer",
}

```

### GET /bands/portofolio/:bandId (get all portofolio in the band by bandId)

Request
```json
- params = bandId integer
```

Response
```json
{
  "portofolio": [
    {
      "id": "integer",
      "BandId": "integer",
      "portofolioType": "string",
      "fileUrl": "string",
    }
  ]
}
```

### DELETE /bands/portofolio/:id (delete portofolio by id portofolio)

Request
```json
- params = id integer
```

Response
```json
{
    "message": "Success Deleting Portofolio"
}
```

### POST /bands/portofolio/url (create porto with url link)

Request
```json
- headers = access_token string
{
  "fileUrl": "string",
  "portofolioType": "string"
}
```

Response
```json
- status = 201
{
  "fileUrl": "string",
  "portofolioType": "string",
  "BandId": "integer"
}
```


### GET /transactions/:bandId

Request
```json
- params = bandId integer
```

Response
```json
- status = 200
{
  "transactions": [
    {
      "id": "integer",
      "UserId": "integer",
      "BandId": "integer",
      "date": "date",
      "duration": "integer",
      "address": "string",
      "rating": "decimal",
      "review": "string"
    }
  ]
}
```

### GET /transactions

Request
```json
- headers = access_token string
- query = "/transactions?name=ridho&location=jakarta&duration=2&date=2021-03-22&bandId=" + bandId
```

Response
```json
- status: 201
{
  "snapToken": "string"
}
```

### PATCH /transactions/:id

Request
```json
- headers = access_token string
- params = id integer
{
  "rating": "decimal",
  "review": "string"
}
```

Response
```json
- status = 200
{ 
  "message": "Success give rating & review" 
}
```

### GET /genres

Request
```json
```

Response
```json
{
  "genres": [
    {
      "name": "string"
    }
  ]
}
```



