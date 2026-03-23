import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { deleteSessions, getSessionById, getSessions, getTodos, login } from "../../api";
import type { Todo } from "../../store/todo/TodoType";
import type { User } from "../../context/AuthType";
import type { Session } from "../../store/redux-session/SessionsType";

vi.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("API functions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("login returns user if credentials match", async () => {
    const users: User[] = [
      { id: 1, username: "alesia", password: "123", role: "user", permissions: ["view_todos"] },
    ];
    mockedAxios.get.mockResolvedValue({ data: users });

    const user = await login("alesia", "123");
    expect(user).toEqual(users[0]);
  });

  it("login returns null if credentials do not match", async () => {
    mockedAxios.get.mockResolvedValue({ data: [] });
    const user = await login("bob", "wrong");
    expect(user).toBeNull();
  });

  it("getTodos returns list of todos", async () => {
    const todos: Todo[] = [
      { id: 1, title: "Todo 1", completed: false, userId: 1 },
    ];
    mockedAxios.get.mockResolvedValue({ data: todos });

    const result = await getTodos();
    expect(result).toEqual(todos);
  });

  it("getSessions returns list of sessions", async () => {
    const sessions: Session[] = [
      { id: "sess01", title: "React Intro", summary: "desc", description: "desc", duration: 1, date: "2026-03-17", image: "img", price: 50 },
    ];
    mockedAxios.get.mockResolvedValue({ data: sessions });

    const result = await getSessions();
    expect(result).toEqual(sessions);
  });

  it("getSessionById returns a session", async () => {
    const session: Session = { id: "sess01", title: "React Intro", summary: "desc", description: "desc", duration: 1, date: "2026-03-17", image: "img", price: 50 };
    mockedAxios.get.mockResolvedValue({ data: session });

    const result = await getSessionById("sess01");
    expect(result).toEqual(session);
  });

  it("deleteSessions calls axios.delete with correct id", async () => {
    mockedAxios.delete.mockResolvedValue({});

    await deleteSessions("sess01");
    expect(mockedAxios.delete).toHaveBeenCalledWith("http://localhost:3001/sessions/sess01");
  });
});