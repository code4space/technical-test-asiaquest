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
describe("GET /quick-note", () => {
    test("GET /quick-note - success test", () => {
        return request(app)
            .get("/quick-note")
            .set("access_token", access_token_student)
            .then((response) => {
                expect(response.status).toBe(200);
                expect(response.body).toBeInstanceOf(Object);
                expect(response.body).toHaveProperty("note", expect.any(Array));
            });
    });
    test("GET /quick-note - invalid token or forbidden test", () => {
        return request(app)
            .get("/quick-note")
            .set("access_token", '')
            .then((response) => {
                expect(response.status).toBe(401);
                expect(response.body).toBeInstanceOf(Object);
                expect(response.body).toHaveProperty("message", "Invalid Token");
            });
    });
});

describe("POST /quick-note", () => {
    test("POST /quick-note - success test", () => {
        const payload = {
            title: 'asdzxc',
            description: 'nothing'
        }
        return request(app)
            .post("/quick-note")
            .send(payload)
            .set("access_token", access_token_student)
            .then((response) => {
                expect(response.status).toBe(201);
                expect(response.body).toBeInstanceOf(Object);
                expect(response.body).toHaveProperty("message", "new Note has been created");
            });
    });

    test("POST /quick-note - invalid token or forbidden test", () => {
        const payload = {
            title: 'asdzxc',
            description: 'nothing'
        }
        return request(app)
            .post("/quick-note")
            .send(payload)
            .set("access_token", '')
            .then((response) => {
                expect(response.status).toBe(401);
                expect(response.body).toBeInstanceOf(Object);
                expect(response.body).toHaveProperty("message", "Invalid Token");
            });
    });
});

describe("PATCH /quick-note", () => {
    test("PATCH /quick-note - success test", async () => {
        const payload = {
            title: 'asdzxc',
            description: 'nothing'
        }
        const { id } = await Note.findOne({ where: { title: 'asdzxc' } })
        return request(app)
            .patch(`/quick-note/${id}`)
            .send(payload)
            .set("access_token", access_token_student)
            .then((response) => {
                expect(response.status).toBe(202);
                expect(response.body).toBeInstanceOf(Object);
                expect(response.body).toHaveProperty("message", "Update Note success");
            });
    });

    test("PATCH /quick-note - invalid token or forbidden test", () => {
        const payload = {
            title: 'asdzxc',
            status: 'To Do',
            description: 'nothing'
        }
        return request(app)
            .patch("/quick-note")
            .send(payload)
            .set("access_token", '')
            .then((response) => {
                expect(response.status).toBe(401);
                expect(response.body).toBeInstanceOf(Object);
                expect(response.body).toHaveProperty("message", "Invalid Token");
            });
    });
});

describe("DELETE /quick-note", () => {
    test("DELETE /quick-note - success test", async () => {
        const { id } = await Note.findOne({ where: { title: 'asdzxc' } })
        return request(app)
            .delete(`/quick-note/${id}`)
            .set("access_token", access_token_student)
            .then((response) => {
                expect(response.status).toBe(200);
                expect(response.body).toBeInstanceOf(Object);
                expect(response.body).toHaveProperty("message", "note deleted successfully");
            });
    });

    test("DELETE /quick-note - invalid token or forbidden test", () => {
        return request(app)
            .delete("/quick-note")
            .set("access_token", '')
            .then((response) => {
                expect(response.status).toBe(401);
                expect(response.body).toBeInstanceOf(Object);
                expect(response.body).toHaveProperty("message", "Invalid Token");
            });
    });
});