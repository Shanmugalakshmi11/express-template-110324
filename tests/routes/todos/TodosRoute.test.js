const request = require("supertest");
const app = require("../../../src/server");

describe("GET /v1/todos/all", () => {
  test("Test /all todos route", async () => {
    const response = await request(app)
      .get("/v1/todos/all")
      .expect("Content-Type", /json/)
      .expect(200);

    const myTodos = response.body;
    const myFirstTodo = myTodos[0];

    expect(myTodos.length).toBeGreaterThan(0);
    expect(myFirstTodo.id).toBeDefined();
    expect(myFirstTodo.task).toBeDefined();
    expect(myFirstTodo.userId).toBeDefined();
    expect(myFirstTodo.dueDate).toBeDefined();
  });
});

describe("GET /v1/todos/byid", () => {
  test("responds with json", async () => {
    const todoId = 1;
    const response = await request(app)
      .get(`/v1/todos/byid?todoId=${todoId}`)
      .expect("content-Type", /json/)
      .expect(200);
    const myTodo = response.body.todo;
    expect(myTodo.id).toEqual(todoId);
    // Log the actual "Content-Type" for debugging purposes
    console.log("Actual Content-Type:", response.headers["content-type"]);
  });
});

describe("Test Mutations (PUT,POST, DELETE)", () => {
  test("Test Create Object", async () => {
    const response = await request(app)
      .post(`/v1/todos/create`)
      .send({
        newTask: "Tennis spielen",
        newIsDone: false,
        newDueDate: "2026-10-10",
        newUserId: 2,
      })
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
