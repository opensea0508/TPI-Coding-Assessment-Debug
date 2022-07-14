import { Injectable } from "@angular/core";
import { Todo } from "../models/todo.model";
import { AbstractStore } from "./abstract-store.model";

export interface TodosState {
  todos: Todo[] | null
}

export const initialTodosState = {
  todos: null
}

@Injectable({
  providedIn: 'root'
})
export class TodosStore extends AbstractStore<TodosState> {
  constructor() {
    super({ ...initialTodosState });
  }

  public createTodo(todo: Todo): void {
    this.setState({
      ...this.state,
      todos: [...(this.state?.todos || []), todo]
    });
  }

  public updateTodo(todoId: number, todo: Todo): void {
    /*
      @TASK - implement the updateTodo method to update the todo from the list with the given id (todoId)
    */
  }

  public deleteTodo(todoId: number): void {
    /*
      @TASK - implement the deleteTodo method to delete the todo from the list with the given id (todoId)
    */
  }
}
