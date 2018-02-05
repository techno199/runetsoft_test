import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Task } from '../task';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  @Input() task: Task;
  @Output() onRemove = new EventEmitter<Task>();
  @Output() onMovePrev = new EventEmitter<Task>();
  @Output() onMoveNext = new EventEmitter<Task>();

  ngOnInit() {
  }

  remove() {
    this.onRemove.emit(this.task);
  }

  movePrev() {
    this.onMovePrev.emit(this.task);
  }

  moveNext() {
    this.onMoveNext.emit(this.task);
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
    }, (reason) => {
    });
  }

}
