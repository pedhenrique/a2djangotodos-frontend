import { Component, OnInit } from '@angular/core';
import {Todo} from '../Todo';
import {TodoService} from '../services/todo.service';


@Component({
  selector: 'todos',
  templateUrl: './todos.component.html',
  providers: [TodoService]
})
export class TodosComponent implements OnInit {
  todos: Todo[];
  

  constructor(private _todoService:TodoService) {

  }

  ngOnInit() {

    this._todoService.getTodos()
      .subscribe(res => {
        this.todos = res;
      });
  }

  addTodo(todoInput: HTMLInputElement) {
    var newTodo: Todo = {
      text: todoInput.value,
      is_completed: false,
    };

    this._todoService.addTodo(newTodo)
      .subscribe(res => {
        var todo: Todo;
        todo = res;
        this.todos.push(todo);
        todoInput.value = "";
      });
  }

  setEditState(todo: Todo) {
    if(todo.edit_state) {
      delete todo.edit_state;
    } else {
      todo.edit_state = true;
    }
  }

  updateTodo(todo: Todo) {
    this._todoService.updateTodo(todo)
      .subscribe(res => {
        if(todo.edit_state) {
          delete todo.edit_state;
        }
      });
  }

  deleteTodo(todo: Todo) {
    this._todoService.deleteTodo(todo)
      .subscribe(res => {
        var index = this.todos.indexOf(todo);
        if (index > -1) {
          this.todos.splice(index, 1);
        }
      });
  }



}
