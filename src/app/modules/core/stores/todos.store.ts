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

    let len = this.state.todos!.length;
    let temp: Todo[] = [];

    for (let i = 0; i < len; i++) {
      let todoString: string = "", id: number = 0, isComplete: boolean = false;
      todoString = this.state.todos![i].todo;
      id = this.state.todos![i].id;
      if(id === todoId) {
        isComplete = todo.isComplete;
      } else {
        isComplete = this.state.todos![i].isComplete;
      }
      let tempTodo = {
        todo: todoString,
        id,
        isComplete
      }
      temp.push(tempTodo);
    }

    this.setState({
      ...this.state,
      todos: [...temp]
    })

  }

  public deleteTodo(todoId: number): void {
    /*
      @TASK - implement the deleteTodo method to delete the todo from the list with the given id (todoId)
    */

    let len = this.state.todos!.length;
    let temp: Todo[] = [];

    for (let i = 0; i < len; i++) {
      let todoString: string = "", id: number = 0, isComplete: boolean = false;
      todoString = this.state.todos![i].todo;
      isComplete = this.state.todos![i].isComplete;
      id = this.state.todos![i].id;
      if(id === todoId) continue;
      let tempTodo = {
        todo: todoString,
        id,
        isComplete
      }
      temp.push(tempTodo);
    }

    this.setState({
      ...this.state,
      todos: [...temp]
    })

  }
}
