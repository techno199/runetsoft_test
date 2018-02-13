import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Task } from '../task';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private taskService: TaskService
  ) { }

  @Input() task: Task;

  ngOnInit() {
  }

  remove() {
    this.task.state = 'removing';
    setTimeout(() => {this.taskService.removeTask(this.task)
      .subscribe()}, 0);
  }

  movePrev() {
    this.taskService.moveTaskPrev(this.task)
      .subscribe();
  }

  moveNext() {
    this.taskService.moveTaskNext(this.task)
      .subscribe();
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
    }, (reason) => {
    });
  }

}
