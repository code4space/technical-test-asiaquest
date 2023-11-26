const request = require("supertest");
const app = require("./app.js");
const {
  Teacher,
  Student,
} = require("../models/index.js");

//* login teacher
describe("POST /teacher/login", () => {
  test("POST /teacher/login - success test", () => {
    const payload = {
      email: "dono@gmail.com",
      password: "12345",
    };
    return request(app)
      .post("/teacher/login")
      .send(payload)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("access_token", expect.any(String));
        expect(response.body).toHaveProperty("name", expect.any(String));
      });
  });

  test("POST /teacher/login - email null test", () => {
    const payload = {
      email: "",
      password: "12345",
    };
    return request(app)
      .post("/teacher/login")
      .send(payload)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "email is required"
        );
      });
  });

  test("POST /teacher/login - password null test", () => {
    const payload = {
      email: "kamu",
      password: "",
    };
    return request(app)
      .post("/teacher/login")
      .send(payload)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "Password is required"
        );
      });
  });

  test("POST /teacher/login - invalid Username/Password test", () => {
    const payload = {
      email: "kamu",
      password: "12345",
    };
    return request(app)
      .post("/teacher/login")
      .send(payload)
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "Invalid Username/Password"
        );
      });
  });
});

//* register teacher
describe("POST /teacher/register", () => {
  test("POST /teacher/register - success test", () => {
    const payload = {
      fullName: 'user123',
      email: "user123@gmail.com",
      password: '123456',
    };
    return request(app)
      .post("/teacher/register")
      .send(payload)
      .then(async (response) => {
        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("id", expect.any(Number));
        expect(response.body).toHaveProperty("name", expect.any(String));
        await Teacher.destroy({ where: { email: payload.email } })
      });
  });

  test("POST /teacher/register - username null test", () => {
    const payload = {
      email: "aaa",
      password: "12345",
      fullName: ""
    };
    return request(app)
      .post("/teacher/register")
      .send(payload)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "Username is required"
        );
      });
  });

  test("POST /teacher/register - email null test", () => {
    const payload = {
      email: "",
      password: "12345",
      fullName: "hl"
    };
    return request(app)
      .post("/teacher/register")
      .send(payload)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "email is required"
        );
      });
  });

  test("POST /teacher/register - password null test", () => {
    const payload = {
      email: "aaa",
      password: "",
      fullName: "hl"
    };
    return request(app)
      .post("/teacher/register")
      .send(payload)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "Password is required"
        );
      });
  });
});

//* login student
describe("POST /student/login", () => {
  test("POST /student/login - success test", () => {
    const payload = {
      email: "user@gmail.com",
      password: "12345",
    };
    return request(app)
      .post("/student/login")
      .send(payload)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("access_token", expect.any(String));
        expect(response.body).toHaveProperty("name", expect.any(String));
      });
  });

  test("POST /student/login - email null test", () => {
    const payload = {
      email: "",
      password: "12345",
    };
    return request(app)
      .post("/student/login")
      .send(payload)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "email is required"
        );
      });
  });

  test("POST /student/login - password null test", () => {
    const payload = {
      email: "kamu",
      password: "",
    };
    return request(app)
      .post("/student/login")
      .send(payload)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "Password is required"
        );
      });
  });

  test("POST /student/login - invalid Username/Password test", () => {
    const payload = {
      email: "kamu",
      password: "12345",
    };
    return request(app)
      .post("/student/login")
      .send(payload)
      .then((response) => {
        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "Invalid Username/Password"
        );
      });
  });
});

//* register student
describe("POST /student/register", () => {
  test("POST /student/register - success test", () => {
    const payload = {
      fullName: 'user123',
      email: "user123@gmail.com",
      password: '123456',
      GradeId: '3',
    };
    return request(app)
      .post("/student/register")
      .send(payload)
      .then(async (response) => {
        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty("id", expect.any(Number));
        expect(response.body).toHaveProperty("name", expect.any(String));
        await Student.destroy({ where: { email: payload.email } })
      });
  });

  test("POST /student/register - username null test", () => {
    const payload = {
      email: "aaa",
      password: "12345",
      fullName: ""
    };
    return request(app)
      .post("/student/register")
      .send(payload)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "Username is required"
        );
      });
  });

  test("POST /student/register - email null test", () => {
    const payload = {
      email: "",
      password: "12345",
      fullName: "hl"
    };
    return request(app)
      .post("/student/register")
      .send(payload)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "email is required"
        );
      });
  });

  test("POST /student/register - password null test", () => {
    const payload = {
      email: "aaa",
      password: "",
      fullName: "hl"
    };
    return request(app)
      .post("/student/register")
      .send(payload)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "Password is required"
        );
      });
  });


  test("POST /student/register - grade null test", () => {
    const payload = {
      email: "aaa",
      password: "123",
      fullName: "hl",
      grade: ""
    };
    return request(app)
      .post("/student/register")
      .send(payload)
      .then((response) => {
        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body).toHaveProperty(
          "message",
          "GradeId is required"
        );
      });
  });

});