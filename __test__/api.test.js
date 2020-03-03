const request = require("supertest");
const server = require("../server");
const {
  getTeacherData,
  getStudentData,
  getRegisteredStudents
} = require("../utils/index");
const { registerStudents, getCommonStudents } = require("../handlers/api");

const TEACHER = {
  EXIST: "teacher@example.com",
  NOT_EXIST: "newTeacher@example.com"
};

const STUDENT = {
  EXIST: "student@example.com",
  NOT_EXIST: "newStudent@example.com"
};

describe("Services Tests", () => {
    describe("/register Students", () => {
      it("register student", async () => {
        const body = {
          teacher: "teacher@email.com",
          students: ["student1@email.com", "student2@email.com"]
        };
        const res = await registerStudents(
          await request(server)
            .post("/api/register")
            .send(body)
        );
        expect(res.status).toBe(204);
      });
    });

  describe("/commonstudents", () => {
    it("get common students", async () => {
      const res = await getCommonStudents(
        await request(server).get(
          "/api/commonstudents?teacher=teacher%40email.com"
        )
      );
      expect(res.status).toBe(200);
    });
  });
});
