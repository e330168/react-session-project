import type { Todo } from "../../store/todo/TodoType";

  export const todosMock: Todo[] = [
    { 
     id: 1,
     userId: 1, 
     title: "Todo 1", 
     completed: false,
    },
    { 
     id: 2,
     userId: 1, 
     title: "Todo 2", 
     completed: false,
    },
    { 
     id: 3,
     userId: 2, 
     title: "Todo 3", 
     completed: true,
    },
    { 
     id: 4,
     userId: 3, 
     title: "Todo 4", 
     completed: true,
    }
  ];