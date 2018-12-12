import { Component, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service';
import { element } from '@angular/core/src/render3';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {

  taskList: any[];
  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getToDoList().snapshotChanges()
    .subscribe( task => {
      this.taskList = [];
      task.forEach(e => {
         const x = e.payload.toJSON();
        x['key'] = e.key;
        this.taskList.push(x);
      });
      this.taskList.sort((a, b) => {
        return a.isChecked - b.isChecked;
      });
    });

}
onAdd(itemTitle) {
  this.todoService.addTask(itemTitle.value);
  itemTitle.value = null;
}
onDelete(key: string) {
  this.todoService.removeTask(key);
}
alterCheck(key: string, isChecked) {
  this.todoService.checkUncheckTask(key, !isChecked);
}

}
