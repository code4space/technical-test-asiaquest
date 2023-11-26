const request = require("supertest");
const app = require("./app.js");
const { sequelize } = require("../models/index.js");
const {
    Note,
    Routine,
    Teacher,
    title,
    Student,
    Studenttitles,
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
describe("GET /routine", () => {
    test("GET /routine - success test", () => {
        return request(app)
            .get("/routine")
            .set("access_token", access_token_student)
            .then((response) => {
                expect(response.status).toBe(200);
                expect(response.body).toBeInstanceOf(Object);
                expect(response.body).toHaveProperty("routine", expect.any(Array));
            });
    });
    test("GET /routine - invalid token or forbidden test", () => {
        return request(app)
            .get("/routine")
            .set("access_token", '')
            .then((response) => {
                expect(response.status).toBe(401);
                expect(response.body).toBeInstanceOf(Object);
                expect(response.body).toHaveProperty("message", "Invalid Token");
            });
    });
});

describe("POST /routine", () => {
    test("POST /routine - success test", () => {
        const payload = {
            title: 'asdzxc',
            list: ['nothing']
        }
        return request(app)
            .post("/routine")
            .send(payload)
            .set("access_token", access_token_student)
            .then((response) => {
                expect(response.status).toBe(201);
                expect(response.body).toBeInstanceOf(Object);
                expect(response.body).toHaveProperty("message", "new Routine has been created");
            });
    });

    test("POST /routine - invalid token or forbidden test", () => {
        const payload = {
            title: 'asdzxc',
            list: ['nothing']
        }
        return request(app)
            .post("/routine")
            .send(payload)
            .set("access_token", '')
            .then((response) => {
                expect(response.status).toBe(401);
                expect(response.body).toBeInstanceOf(Object);
                expect(response.body).toHaveProperty("message", "Invalid Token");
            });
    });
});

describe("PATCH /routine", () => {
    test("PATCH /routine - success test", async () => {
        const payload = {
            title: 'asdzxc',
            list: ['nothing']
        }
        const { id } = await Routine.findOne({ where: { title: 'asdzxc' } })
        return request(app)
            .patch(`/routine/${id}`)
            .send(payload)
            .set("access_token", access_token_student)
            .then((response) => {
                expect(response.status).toBe(202);
                expect(response.body).toBeInstanceOf(Object);
                expect(response.body).toHaveProperty("message", "Update Routine success");
            });
    });

    test("PATCH /routine - invalid token or forbidden test", () => {
        const payload = {
            title: 'asdzxc',
            list: ['nothing']
        }
        return request(app)
            .patch("/routine")
            .send(payload)
            .set("access_token", '')
            .then((response) => {
                expect(response.status).toBe(401);
                expect(response.body).toBeInstanceOf(Object);
                expect(response.body).toHaveProperty("message", "Invalid Token");
            });
    });
});

describe("DELETE /routine", () => {
    test("DELETE /routine - success test", async () => {
        const { id } = await Routine.findOne({ where: { title: 'asdzxc' } })
        return request(app)
            .delete(`/routine/${id}`)
            .set("access_token", access_token_student)
            .then((response) => {
                expect(response.status).toBe(200);
                expect(response.body).toBeInstanceOf(Object);
                expect(response.body).toHaveProperty("message", "routine deleted successfully");
            });
    });

    test("DELETE /routine - invalid token or forbidden test", () => {
        return request(app)
            .delete("/routine")
            .set("access_token", '')
            .then((response) => {
                expect(response.status).toBe(401);
                expect(response.body).toBeInstanceOf(Object);
                expect(response.body).toHaveProperty("message", "Invalid Token");
            });
    });
});