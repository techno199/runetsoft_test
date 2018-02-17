import { Component, OnInit } from '@angular/core';
import { ElementRef } from '@angular/core/src/linker/element_ref';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { TaskService } from '../task.service';
import { Task } from '../task';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    private modalService: NgbModal, 
    private taskService: TaskService
  ) { }

  isSidebarOpened = false;
  addTaskModalRef: NgbModalRef;
  newTaskName: string;
  newTaskDesc: string;

  ngOnInit() {
  }

  toggleSidebar() {
    this.isSidebarOpened = !this.isSidebarOpened;
  }

  openAddTaskModal(content) {
    if (!this.isSidebarOpened) { return; }
    this.addTaskModalRef = this.modalService.open(content)
  }

  addTask() {
    this.taskService.addTask(this.newTaskName, this.newTaskDesc)
      .subscribe((newId) => {
        this.newTaskName = '';
        this.newTaskDesc = '';
        this.addTaskModalRef.close();
      });
  }
}
