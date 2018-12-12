import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoList: AngularFireList<any>;
  constructor(private db: AngularFireDatabase) {}


  getToDoList() {
    this.todoList = this.db.list('titles');
    return this.todoList;
  }

  addTask(task: string) {
    this.todoList.push({
      title: task,
      isChecked: false
    });
  }

  removeTask(key: string) {
    this.todoList.remove(key);
  }

  checkUncheckTask(key: string, flag: boolean) {
    this.todoList.update(key, {isChecked: flag});
  }

}

