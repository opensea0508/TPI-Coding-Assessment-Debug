import { ThisReceiver, ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo } from 'src/app/modules/core/models/todo.model';
import { TodosStore } from 'src/app/modules/core/stores';
import { buildTodoForm } from '../../components/todo-form/todo-form.builder';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  public todos$!: Observable<Todo[] | null>;
  public completed$!: Observable<Todo[] | null>;
  public todosForm!: FormGroup;

  constructor(
    private _todosStore: TodosStore,
    private _formBuilder: FormBuilder
  ) {
    this.todos$ = this._todosStore
      .select((state) => state.todos)
      .pipe(map((todos: Todo[] | null) => todos?.filter((todo: Todo) => !todo.isComplete) || null));
      
      /*
      @TASK - Select the todos from the store and filter out the incomplete todos. Assign the result to `this.completed$`
      */
   this.completed$ = this._todosStore
     .select((state) => state.todos)
     .pipe(map((todos: Todo[] | null) => todos?.filter((todo: Todo) => todo.isComplete) || null));

    this.todosForm = buildTodoForm(this._formBuilder);
  }

  ngOnInit(): void {
    
  }

  public createTodo(todo: Todo): void {
    todo.id = this._generateTodoId(10000);
    todo.isComplete = false;
    this._todosStore.createTodo(todo);
    this.todosForm.reset();
  }

  public updateTodo(todo: Todo): void {
    /*
      @TASK - update the todo in the store.
    */
    this._todosStore.updateTodo(todo.id, todo);
  }

  public deleteTodo(todo: Todo): void {
    /*
      @TASK - delete the todo in the store.
    */
    this._todosStore.deleteTodo(todo.id);
  }

  private _generateTodoId(max: number) {
    return Math.floor(Math.random() * max);
  }
}
