import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/modules/core/models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  @Input()
  public todos: Todo[] | null = null;

  @Output()
  public onComplete: EventEmitter<Todo> = new EventEmitter<Todo>();

  @Output()
  public onDelete: EventEmitter<Todo> = new EventEmitter<Todo>();

  public updateTodo(todo: Todo): void {
    this.onComplete.emit({
      ...todo,
      isComplete: true,
    });
  }

  public deleteTodo(todo: Todo): void {
    this.onDelete.emit(todo);
  }
}
