import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Todo} from "../Todo";


@Injectable()
export class TodoService {
    token: string;

    constructor(private _http:Http) {
      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({'headers': headers});

      let credentials = {
        username: 'pedro',
        password: '12345678a'
      };
      
      this._http.post('http://localhost:8000/api-token-auth/', JSON.stringify(credentials), options)
        .map(res => res.json())
        .subscribe(res => {
          this.token = res.token;
        });
    }

    getTodos() {
      return this._http.get('http://localhost:8000/todos/')
        .map(res => res.json().results);
    }

    addTodo(todo: Todo) {
      let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.token
      });
      let options = new RequestOptions({'headers': headers});

      return this._http.post('http://localhost:8000/todos/', JSON.stringify(todo), options)
        .map(res => res.json());
    }

    updateTodo(todo: Todo) {
      let headers = new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + this.token
      });
      let options = new RequestOptions({'headers': headers});

      return this._http.put('http://localhost:8000/todos/'+todo.id+'/', JSON.stringify(todo), options)
        .map(res => res.json());
    }

    deleteTodo(todo: Todo) {
      let headers = new Headers({
        'Authorization': 'JWT ' + this.token
      });
      let options = new RequestOptions({'headers': headers});
      return this._http.delete('http://localhost:8000/todos/'+todo.id+'/', options);
    }
}
