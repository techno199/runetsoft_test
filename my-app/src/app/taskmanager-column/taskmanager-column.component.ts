import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task';
import { TaskType } from '../task-types';

@Component({
  selector: 'app-taskmanager-column',
  templateUrl: './taskmanager-column.component.html',
  styleUrls: ['./taskmanager-column.component.scss']
})
export class TaskmanagerColumnComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  @Input() type: TaskType;
  tasks: Task[];

  ngOnInit() {
    this.getTasks();
  }

  onRemove(task: Task) {
    this.taskService.removeTask(task)
      .subscribe((deletedId) => {
        this.getTasks();
      })
  }

  onMoveNext(task: Task) {
    this.taskService.moveTaskNext(task)
      .subscribe();
  }

  onMovePrev(task: Task) {
    this.taskService.moveTaskPrev(task)
      .subscribe();
  }

  getTasks() {
    this.taskService.getTasks(this.type)
      .subscribe((tasks) => {
        this.tasks = tasks;
      })
  }

}
