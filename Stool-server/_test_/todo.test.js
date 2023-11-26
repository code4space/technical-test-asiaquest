const request = require("supertest");
const app = require("./app.js");
const { sequelize } = require("../models/index.js");
const {
    Note,
    Routine,
    Todo,
    Teacher,
    Task,
    Student,
    StudentTasks,
    Notification,
    StudentNotification,
} = require("../models/index.js");
const { queryInterface } = sequelize;
const { getToken } = require("../helper/jwt.js");
const userEmail = "customer@gmail.com";
const userEmail1 = "dia@gmail.com";
let access_token_student;
let access_token_teacher;

beforeAll(async () => {
    //* access token student
    const student = await Student.findOne({
        where: { email: 'user@gmail.com' },
    })
    const payload = { id: student.id, fullName: student.fullName, role: "student" };
    access_token_student = getToken(payload);

    //* access token student
    const teacher = await Teacher.findOne({
        where: { email: 'dono@gmail.com' },
    })
    const payload1 = { id: teacher.id, fullName: teacher.fullName, role: "student" };
    access_token_teacher = getToken(payload1);
});

//* login teacher
describe("GET /todo", () => {
    test("GET /todo - success test", () => {
        return request(app)
            .get("/todo")
            .set("access_token", access_token_student)
            .then((response) => {
                expect(response.status).toBe(200);
                expect(response.body).toBeInstanceOf(Object);
                expect(response.body).toHaveProperty("todo", expect.any(Array));
            });
    });
    test("GET /todo - invalid token or forbidden test", () => {
        return request(app)
            .get("/todo")
            .set("access_token", '')
            .then((response) => {
                expect(response.status).toBe(401);
                expect(response.body).toBeInstanceOf(Object);
                expect(response.body).toHaveProperty("message", "Invalid Token");
            });
    });
});

describe("POST /todo", () => {
    test("POST /todo - success test", () => {
        const payload = {
            task: 'asdzxc',
            status: 'To Do',
            comment: 'nothing'
        }
        return request(app)
            .post("/todo")
            .send(payload)
            .set("access_token", access_token_student)
            .then((response) => {
                expect(response.status).toBe(201);
                expect(response.body).toBeInstanceOf(Object);
                expect(response.body).toHaveProperty("message", "new Todo has been created");
            });
    });

    test("POST /todo - invalid token or forbidden test", () => {
        const payload = {
            task: 'asdzxc',
            status: 'To Do',
            comment: 'nothing'
        }
        return request(app)
            .post("/todo")
            .send(payload)
            .set("access_token", '')
            .then((response) => {
                expect(response.status).toBe(401);
                expect(response.body).toBeInstanceOf(Object);
                expect(response.body).toHaveProperty("message", "Invalid Token");
            });
    });
});

describe("PATCH /todo", () => {
    test("PATCH /todo - success test", async () => {
        const payload = {
            task: 'asdzxc',
            status: 'To Do',
            comment: 'nothing'
        }
        const { id } = await Todo.findOne({ where: { task: 'asdzxc' } })
        return request(app)
            .patch(`/todo/${id}`)
            .send(payload)
            .set("access_token", access_token_student)
            .then((response) => {
                expect(response.status).toBe(202);
                expect(response.body).toBeInstanceOf(Object);
                expect(response.body).toHaveProperty("message", "Update Todo success");
            });
    });

    test("PATCH /todo - invalid token or forbidden test", () => {
        const payload = {
            task: 'asdzxc',
            status: 'To Do',
            comment: 'nothing'
        }
        return request(app)
            .patch("/todo")
            .send(payload)
            .set("access_token", '')
            .then((response) => {
                expect(response.status).toBe(401);
                expect(response.body).toBeInstanceOf(Object);
                expect(response.body).toHaveProperty("message", "Invalid Token");
            });
    });
});

describe("DELETE /todo", () => {
    test("DELETE /todo - success test", async () => {
        const { id } = await Todo.findOne({ where: { task: 'asdzxc' } })
        return request(app)
            .delete(`/todo/${id}`)
            .set("access_token", access_token_student)
            .then((response) => {
                expect(response.status).toBe(200);
                expect(response.body).toBeInstanceOf(Object);
                expect(response.body).toHaveProperty("message", "Todo deleted successfully");
            });
    });

    test("DELETE /todo - invalid token or forbidden test", () => {
        return request(app)
            .delete("/todo")
            .set("access_token", '')
            .then((response) => {
                expect(response.status).toBe(401);
                expect(response.body).toBeInstanceOf(Object);
                expect(response.body).toHaveProperty("message", "Invalid Token");
            });
    });
});