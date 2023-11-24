[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/0302N4UV)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12856539&assignment_repo_type=AssignmentRepo)

# Individual Project Phase 2

## Covid Website

### Method

- GET
- POST
- PATCH
- DELETE

### Status Code

- 200 = OK
- 201 = CREATED
- 400 = BAD REQUEST
- 401 = UNAUTHORIZED
- 403 = FORBIDDEN
- 404 = ERROR NOT FOUND
- 500 = INTERNAL SERVER ERROR

### Endpoints:

-list of available endpoints:

| Method | Route           | Description                           |
| :----- | :-------------- | :------------------------------------ |
| POST   | /register       | Menambahkan user                      |
| POST   | /login          | Login untuk user yang telah terfadtar |
| POST   | /google-login   | login menggunakan akun google         |
| GET    | /github-login   | login menggunakan akun github         |
| GET    | /users          | Menampilkan seluruh user              |
| PUT    | /users/:id      | Mengubah data user berdasarkan id     |
| DELETE | /users/:id      | Menghapus menu berdasarkan id         |
| GET    | /categories     | Menampilkan seluruh category          |
| GET    | /categories/:id | Menampilkan category berdasarkan id   |
| POST   | /categories/:id | Menambahkan category berdasarkan id   |
| POST   | /posts          | Menambahkan post                      |
| GET    | /posts          | Menampilkan seluruh data post         |

### Description

#### POST/register

_Request Body:_

```json
{
  "firstName": "string",
  "lastName": "string",
  "phoneNumber": "string",
  "province": "string",
  "city": "string",
  "email": "string",
  "password": "string",
  "CategoryId": "<integer>"
}
```

_Response (201 - Created)_

```json
{
  "msg": "berhasil register"
}
```

_Response (400 - Bad Request)_

```json
{
    "msg": "first name cannot be null"
}
OR
{
    "msg": "first name cannot be empty"
}
OR
{
    "msg": "last name cannot be null"
}
OR
{
    "msg": "last name cannot be empty"
}
OR
{
    "msg": "phone number cannot be null"
}
OR
{
    "msg": "phone number cannot be empty"
}
OR
{
    "msg": "province cannot be null"
}
OR
{
    "msg": "province cannot be empty"
}
OR
{
    "msg": "city cannot be null"
}
OR
{
    "msg": "city cannot be empty"
}
OR
{
    "msg": "email cannot be null"
}
OR
{
    "msg": "email cannot be empty"
}
OR
{
    "msg": "Validation isEmail on email failed"
}
OR
{
    "msg": "password cannot be null"
}
OR
{
    "msg": "password cannot be empty"
}
OR
{
    "msg": "CategoryId cannot be null"
}
OR
{
    "msg": "CategoryId cannot be empty"
}
```

#### POST/login

_Request Body_

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZmlyc3ROYW1lIjoiY29iYSIsImVtYWlsIjoibnlvYmFAbWFpbC5jb20iLCJDYXRlZ29yeUlkIjoyLCJpYXQiOjE3MDA3NjQwODB9.bRDsIZBlw66CyvTpVaoOJ0lySTHmInRKiCYVG0SdL50"
}
```

_Response (400 - Bad Request)_

```json
{
  "msg": "Invalid email/password"
}
```

_Response (404 - Not Found)_

```json
{
  "msg": "Not Found"
}
```

#### GET/users

_Response (200 - Ok)_

```json
{
    "data": [
        {
            "id": 1,
            "firstName": "test",
            "lastName": "test",
            "phoneNumber": "9876543",
            "province": "Jawa Barat",
            "city": "Bandung",
            "email": "test@mail.com",
            "CategoryId": 1
        },
        {
            "id": 2,
            "firstName": "Sabirah",
            "lastName": "Azzahrah",
            "phoneNumber": "defaults",
            "province": "defaults",
            "city": "defaults",
            "email": "sabirahazzahrah@gmail.com",
            "CategoryId": 1
        },
        {
            "id": 3,
            "firstName": "apa",
            "lastName": "ya",
            "phoneNumber": "9876544",
            "province": "sumatera utara",
            "city": "medan",
            "email": "apaya@mail.com",
            "CategoryId": 1
        },
        ...
    ]
}
```

_Response (401 - Unauthorized)_

```json
{
  "msg": "Unauthorized"
}
```

#### UPDATE/users/:id

_Request Params_

```json
{
  "id": "<integer>"
}
```

_Request Body:_

```json
{
  "firstName": "string",
  "lastName": "string",
  "phoneNumber": "string",
  "province": "string",
  "city": "string",
  "email": "string",
  "password": "string",
  "CategoryId": "<integer>"
}
```

_Response (200 - Ok)_

```json
{
  "firstName": "string",
  "lastName": "string",
  "phoneNumber": "string",
  "province": "string",
  "city": "string",
  "email": "string",
  "password": "string",
  "CategoryId": "<integer>"
}
```

_Response (400 - Bad Request)_

```json
{
    "msg": "first name cannot be null"
}
OR
{
    "msg": "first name cannot be empty"
}
OR
{
    "msg": "last name cannot be null"
}
OR
{
    "msg": "last name cannot be empty"
}
OR
{
    "msg": "phone number cannot be null"
}
OR
{
    "msg": "phone number cannot be empty"
}
OR
{
    "msg": "province cannot be null"
}
OR
{
    "msg": "province cannot be empty"
}
OR
{
    "msg": "city cannot be null"
}
OR
{
    "msg": "city cannot be empty"
}
OR
{
    "msg": "email cannot be null"
}
OR
{
    "msg": "email cannot be empty"
}
OR
{
    "msg": "Validation isEmail on email failed"
}
OR
{
    "msg": "password cannot be null"
}
OR
{
    "msg": "password cannot be empty"
}
OR
{
    "msg": "CategoryId cannot be null"
}
OR
{
    "msg": "CategoryId cannot be empty"
}
```

_Response (401 - Unauthorized)_

```json
{
  "msg": "Unauthorized"
}
```

_Response (404 - Not Found)_

```json
{
  "msg": "Not Found"
}
```

#### DELETE/users/:id

_Request Params_

```json
{
  "id": "<integer>";
}
```

_Response (200 - Ok)_

```json
{
  "msg": "<entity name> success to delete";
}
```

_Response (401 - Unauthorized)_

```json
{
  "msg": "Unauthorized"
}
```

_Response (404 - Not Found )_

```json
{
  "msg": "Not Found"
}
```

#### GET/categories

_Request (200 - Ok)_

```json
{
    "data": [
        {
            "id": 1,
            "name": "Eta",
            "Users": [
                {
                    "id": 7,
                    "firstName": "sabirah",
                    "lastName": "azzahrah",
                    "phoneNumber": "0987654",
                    "province": "sumatera utara",
                    "city": "medan",
                    "email": "sabirah@mail.com",
                    "CategoryId": 1
                },
                ...
            ]
        },
        ...
    ]
}
```

_Response (401 - Unauthorized)_

```json
{
  "msg": "Unauthorized"
}
```

#### GET/categories:id

_Request Params_

```json
{
  "id": "<integer>"
}
```

_Response (200 - Ok)_

```json
{
  "data": {
    "id": 1,
    "name": "Eta",
    "createdAt": "2023-11-16T13:37:00.693Z",
    "updatedAt": "2023-11-16T13:37:00.693Z"
  }
}
```

_Response (401 - Unauthorized)_

```json
{
  "msg": "Unauthorized"
}
```

_Response (404 - Not Found)_

```json
{
  "msg": "Not Found"
}
```

#### POST/categories

_Request Body_

```json
{
  "name": "string",
  "code": "string",
  "description": "string"
}
```

_Response (401 - Unauthorized)_

```json
{
  "msg": "Unauthorized"
}
```

#### POST/posts

_Request Body_

```json
{
  "history": "string"
}
```

_Response (201 - Created)_

```json
{
  "history": "string",
  "UserId": "<integer>"
}
```

_Response (401 - Unauthorized)_

```json
{
  "msg": "Unauthorized"
}
```

#### GET/posts

_Response (200 - Ok)_

```json
{
  "msg": "berhasil add post",
  "data": {
    "id": 7,
    "history": "saya udah kemarin",
    "UserId": 8,
    "updatedAt": "2023-11-23T20:27:28.256Z",
    "createdAt": "2023-11-23T20:27:28.256Z"
  }
}
```

_Response (401 - Unauthorized)_

```json
{
  "msg": "Unauthorized"
}
```

### Global Error - 500

```json
{
  "msg": "Internal Server Error"
}
```
