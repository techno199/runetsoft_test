import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task';
import { TaskType } from '../task-types';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-taskmanager-column',
  templateUrl: './taskmanager-column.component.html',
  styleUrls: ['./taskmanager-column.component.scss'],
  animations: [
    trigger('taskState', [
      state('active', style({
        opacity: '*'
      })),
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate('100ms ease-in')
      ]),
      transition('removing => void', animate('0.2s 0.1s ease-out', style({
        transform: 'scale(0.6)',
        opacity: 0.2
      }))),
      transition('active => void', animate(100, style({
        height: 0
      })))
    ])
  ]
})
export class TaskmanagerColumnComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  @Input() type: TaskType;
  tasks: Task[];

  ngOnInit() {
    this.getTasks();
    this.taskService.change
      .subscribe((type: TaskType) => {
        if (this.type.id === type.id) {
          this.getTasks();
        }
      })
    this.taskService.onRemove
      .subscribe((task: Task) => {
        this.tasks = this.tasks.filter((t) => t.id !== task.id);
      })
    this.taskService.onAdd
      .subscribe((task: Task) => {
        if (this.type.id === task.typeId) {
          this.tasks.push(task);
        }
      })
  }

  getTasks() {
    this.taskService.getTasks(this.type)
      .subscribe((tasks) => {
        this.tasks = tasks;
      })
  }

}
