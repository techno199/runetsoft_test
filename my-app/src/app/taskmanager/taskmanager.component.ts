import { Component, OnInit } from '@angular/core';
import { TaskType } from '../task-types';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-taskmanager',
  templateUrl: './taskmanager.component.html',
  styleUrls: ['./taskmanager.component.scss']
})
export class TaskmanagerComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  taskTypes= [];
  counter = 0;

  ngOnInit() {
    this.getTaskTypes();
    this.taskService.change
      .subscribe(() => {
        this.getTaskTypes();
      })
  }

  getTaskTypes() {
    this.taskService.getTaskTypes()
      .subscribe((types) => {
        this.taskTypes = types;
      })
  }

}
