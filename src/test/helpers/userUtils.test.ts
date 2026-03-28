// import { describe, it, expect, vi } from "vitest";
// import * as api from "../../api";
// import { todosMock } from "../../test/mocks/todos";
// import { createUsersFromTodos, getTodosForUser, loginTodo } from "../../helpers/todos";

// describe("User Utils", () => {
//   it("filters todos by userId", () => {
//     const user1Todos = getTodosForUser(todosMock, 1);
//     expect(user1Todos).toHaveLength(2);
//     expect(user1Todos.every((t) => t.userId === 1)).toBe(true);
//   });

//   it("creates users from todos", () => {
//     const users = createUsersFromTodos(todosMock);
//     expect(users).toHaveLength(3);
//     expect(users.find((u) => u.id === 1)?.role).toBe("admin");
//     expect(users.find((u) => u.id === 2)?.role).toBe("user");
//     expect(users.find((u) => u.id === 3)?.role).toBe("user");
//   });

//   it("logs in valid users", async () => {
//     vi.spyOn(api, "getTodos").mockResolvedValue(todosMock);

//     const user = await loginTodo("user1", "123456");
//     expect(user).not.toBeNull();
//     expect(user?.id).toBe(1);

//     const userFail = await loginTodo("userX", "123456");
//     expect(userFail).toBeNull();
//   });

//   it("fails login for invalid username", async () => {
//     vi.spyOn(api, "getTodos").mockResolvedValue(todosMock);

//     const result = await loginTodo("admin", "123456");
//     expect(result).toBeNull();

//     const result1 = await api.login("admin", "123456");
//      expect(result1).not.toBeNull();
//   });
// });