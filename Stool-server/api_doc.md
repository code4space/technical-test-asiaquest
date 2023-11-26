## Schoot API Endpoints

<b style='margin-left:40px'>Login/Register</b>

- [POST /teacher/login](#/teacher/login)
- [POST /teacher/register](#/teacher/register)
- [POST /student/login](#/student/login)
- [POST /student/register](#/student/register)
  </br>
  </br>
  <b>Task</b>
- [POST /task](#/task)
- [PATCH /comment/:id](#/comment/:id)
- [GET /completed-task](#/completed-task)
- [PATCH /do-task/:id](#/do-task/:id)
- [GET /student/task](#/student/task)
  </br>
  </br>
  <b>Notification</b>
- [GET /notification](#GET-/notification)
- [PATCH /notification](#PATCH-/notification)
  </br>
  </br>
  <b>Quick Note</b>
- [GET /quick-note](#GET-/quick-note)
- [PATCH /quick-note/:id](#PATCH-/quick-note/:id)
- [POST /quick-note](#POST-/quick-note)
- [DELETE /quick-note/:id](#DELETE-/quick-note/:id)
  </br>
  </br>
  <b>Routine</b>
- [GET /routine](#GET-/routine)
- [PATCH /routine/:id](#PATCH-/routine/:id)
- [POST /routine](#POST-/routine)
- [DELETE /routine/:id](#DELETE-/routine/:id)
  </br>
  </br>
  <b>Todo</b>
- [GET /todo](#GET-/todo)
- [PATCH /todo/:id](#PATCH-/todo/:id)
- [POST /todo](#POST-/todo)
- [DELETE /todo/:id](#DELETE-/todo/:id)
  </br>
  </br>
  <b>AI API</b>
- [POST /ask-ai](#/ask-ai)

&nbsp;

<a id="/teacher/login"></a>

## 1. POST /teacher/login
Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - Success)_

```json
{
  "access_token": "string",
  "name": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Username/Password"
}
```

&nbsp;

<a id="/teacher/register"></a>

## 2. POST /teacher/register

Request:

- body:

```json
{
  "fullName": "string",
  "email": "string",
  "password": "string"
}
```

_Response (200 - Success)_

```json
{
  "access_token": "string",
  "name": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Username is required"
}
OR
{
  "message": "email is required"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Email must be unique"
}
```

&nbsp;

<a id="/student/login"></a>

## 3. POST /student/login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - Success)_

```json
{
  "access_token": "string",
  "name": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Username/Password"
}
```

&nbsp;

<a id="/student/register"></a>

## 4. POST /student/register

Request:

- body:

```json
{
  "email": "string",
  "password": "string",
  "fullName": "string",
  "GradeId": "int"
}
```

_Response (201 - Created)_

```json
{
  "id": "string",
  "name": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
OR
{
  "message": "Username is required"
}
OR
{
  "message": "GradeId is required"
}
OR
{
  "message": "Email must be unique"
}
```

&nbsp;

<a id="/task"></a>

## 5. POST /task

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "date": "string",
  "title": "string",
  "description": "string",
  "GradeId": "int"
}
```

_Response (201 - Created)_

```json
{
  "message": "Task has been added "
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "date is required"
}
OR
{
  "message": "title is required"
}
OR
{
  "message": "description is required"
}
OR
{
  "message": "GradeId is required"
}
```

&nbsp;

<a id="/comment/:id"></a>

## 6. POST /comment/:id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "comment": "string",
  "TaskId": "int",
  "StudentId": "int"
}
```

- params:

```json
{
  "id": "string"
}
```

_Response (202 - Accepted)_

```json
{
  "message": "add comment success"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "comment is required"
}
OR
{
  "message": "TaskId is required"
}
OR
{
  "message": "StudentId is required"
}
```

&nbsp;

<a id="/completed-task"></a>

## 7. GET /completed-task

Description:

- Get teacher completed-task from database

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "status": "completed",
    "answer": "Tumbuhan gurun (misalnya, kaktus dan rumput gurun) ► Serangga pemakan tumbuhan (misalnya, belalang dan kumbang) ► Hewan herbivora (misalnya, kura-kura gurun dan kelinci padang gurun) ► Predator tingkat atas (misalnya, burung pemangsa dan serigala padang gurun)",
    "answer1": null,
    "comment": "jawaban sudah cukup bagus, tapi masih kurang illustrasi apabila tiada salah satu dari hewan tsb",
    "TaskId": 1,
    "StudentId": 1,
    "createdAt": "2023-11-25T00:36:29.374Z",
    "updatedAt": "2023-11-25T00:47:34.763Z",
    "Task": {
      "description": "Sebutkan rantai makanan yang terjadi di ekosistem padang gurun, berikan illustrasi hewan dan apabila salah satu tiada dari rantai makanan apa saja dampaknya bagi ekosistem.",
      "title": "Rantai Makanan",
      "date": "2023-11-30T00:00:00.000Z"
    }
  },
  {
    "id": 5,
    "status": "completed",
    "answer": "Tumbuhan gurun (misalnya, kaktus dan rumput gurun) ► Serangga pemakan tumbuhan (misalnya, belalang dan kumbang) ► Hewan herbivora (misalnya, kura-kura gurun dan kelinci padang gurun) ► Predator tingkat atas (misalnya, burung pemangsa dan serigala padang gurun)",
    "answer1": null,
    "comment": "mantap, lanjutkan :)",
    "TaskId": 2,
    "StudentId": 6,
    "createdAt": "2023-11-25T01:12:59.040Z",
    "updatedAt": "2023-11-25T01:14:19.736Z",
    "Task": {
      "description": "Sebutkan rantai makanan yang terjadi di ekosistem padang gurun, berikan illustrasi hewan dan apabila salah satu tiada dari rantai makanan apa saja dampaknya bagi ekosistem.",
      "title": "Rantai makanan",
      "date": "2023-11-25T00:00:00.000Z"
    }
  }
]
```

&nbsp;

<a id="/do-task/:id"></a>

## 8. PATCH /do-task/:id

Description:

- Update Task by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "answer": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (202 - Accepted)_

```json
{
  "message": "success input answer"
}
```

&nbsp;

<a id="/student/task"></a>

## 9. GET /student/task

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "result": [
    {
      "id": 3,
      "status": "remaining",
      "answer": null,
      "comment": null,
      "releaseDate": "25 November 2023, 07.36 WIB",
      "deadline": "30 November 2023, 07.00 WIB",
      "title": "Rantai Makanan",
      "description": "Sebutkan rantai makanan yang terjadi di ekosistem padang gurun, berikan illustrasi hewan dan apabila salah satu tiada dari rantai makanan apa saja dampaknya bagi ekosistem.",
      "author": "Dono"
    }
  ]
}
```

&nbsp;

<a id="GET-/notification"></a>

## 10. GET /notification

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "result": [
    {
      "id": 3,
      "status": true,
      "description": "Dono has assigned you a new task about Rantai Makanan that needs to be completed by 30 November 2023, 07.00 WIB",
      "date": "25 November 2023"
    }
  ]
}
```

&nbsp;

<a id="PATCH-/notification"></a>

## 11. PATCH /notification

Description:

- Update notification if already read

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (202 - Accepted)_

```json
{
  "message": "Update Notification Success"
}
```

&nbsp;

<a id="GET-/routine"></a>

## 12. GET /routine

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "routine": [
    {
      "id": 6,
      "title": "write your title asdasd asd",
      "list": [
        {
          "desc": "Write some dairy asd  asd",
          "status": true
        },
        {
          "desc": "get some milk aaa aa",
          "status": true
        }
      ]
    },
    {
      "id": 7,
      "title": "write your title",
      "list": [
        {
          "desc": "My list asd",
          "status": true
        },
        {
          "desc": "todo",
          "status": false
        },
        {
          "desc": "todo asd",
          "status": false
        }
      ]
    }
  ]
}
```

&nbsp;

<a id="PATCH-/routine/:id"></a>

## 13. PATCH /routine/:id

Description:

- Update routine by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "title": "string",
  "list": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (202 - Accepted)_

```json
{
  "message": "Update Routine success"
}
```

&nbsp;

<a id="POST-/routine"></a>

## 14. POST /routine

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "title": "string",
  "list": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "new Routine has been created"
}
```

&nbsp;

<a id="DELETE-/routine/:id"></a>

## 15. DELETE /routine/:id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (201 - Createsd)_

```json
{
  "message": "routine deleted successfully"
}
```

&nbsp;

<a id="GET-/quick-note"></a>

## 16. GET /quick-note

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "note": [
    {
      "id": 16,
      "title": "write your title",
      "description": "write your note here.."
    },
    {
      "id": 20,
      "title": "write your title asd",
      "description": "write your note here..asd asd"
    },
    {
      "id": 21,
      "title": "write your title",
      "description": "write your note here.."
    }
  ]
}
```

&nbsp;

<a id="PATCH-/quick-note/:id"></a>

## 17. PATCH /quick-note/:id

Description:

- Update routine by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "title": "string",
  "description": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (202 - Accepted)_

```json
{
  "message": "Update Note success"
}
```

&nbsp;

<a id="POST-/quick-note"></a>

## 18. POST /quick-note

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "title": "string",
  "description": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "new Note has been created"
}
```

&nbsp;

<a id="DELETE-/quick-note/:id"></a>

## 19. DELETE /quick-note/:id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (201 - Createsd)_

```json
{
  "message": "Note deleted successfully"
}
```

&nbsp;

<a id="GET-/todo"></a>

## 20. GET /todo

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "todo": [
    {
      "id": 8,
      "task": "",
      "status": "To Do",
      "comment": "",
      "createdAt": "25 Desember 2023, 17.25 WIB"
    },
    {
      "id": 7,
      "task": "hi",
      "status": "Done",
      "comment": "asdasd ",
      "createdAt": "25 Desember 2023, 17.24 WIB"
    },
    {
      "id": 9,
      "task": "",
      "status": "To Do",
      "comment": "",
      "createdAt": "25 Desember 2023, 17.30 WIB"
    },
  ]
}
```

&nbsp;

<a id="PATCH-/todo/:id"></a>

## 21. PATCH /todo/:id

Description:

- Update routine by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "task": "string",
  "comment": "string",
  "status": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (202 - Accepted)_

```json
{
  "message": "Update Todo success"
}
```

&nbsp;

<a id="POST-/todo"></a>

## 22. POST /todo

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "task": "string",
  "comment": "string",
  "status": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "new Todo has been created"
}
```

&nbsp;

<a id="DELETE-/todo/:id"></a>

## 23. DELETE /todo/:id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (201 - Createsd)_

```json
{
  "message": "Todo deleted successfully"
}
```

&nbsp;

<a id="/ask-ai"></a>

## 24. POST /ask-ai

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "prompt": "string",
}
```

_Response (200 - OK)_

```json
{
  "success": "string",
  "message": "string"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
OR
{
  "message": "Forbiden"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
