import { Injectable, EventEmitter, Output } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { 
  getTasks,
  removeTask,
  updateTask,
  addTask
} from './mock-tasks';
import {
  getTypes, getTypeById
} from './mock-types'
import { TaskType } from './task-types';
import { Task } from './task';
import { Observable } from 'rxjs/Observable';
import { Type } from '@angular/compiler/src/output/output_ast';


@Injectable()
export class TaskService {

  constructor() { }

  @Output() change = new EventEmitter<void>();

  getTaskTypes(): Observable<TaskType[]> {
    return of(getTypes());
  }

  getTasks(type: TaskType): Observable<Task[]> {
    return of(getTasks().filter((t) => t.typeId === type.id));
  }

  removeTask(task: Task): Observable<number> {
    let removedId = removeTask(task);
    this.change.emit();
    return of(removedId);
  }

  moveTaskNext(task: Task): Observable<number> {
    let taskTypes = getTypes();
    let currentTaskType = getTypeById(task.typeId);

    // Sorting task types by priority
    let sortedTaskTypes = taskTypes.sort((a,b) => a.priority - b.priority);
    // Get current task type index
    let currentTaskTypeIndex = sortedTaskTypes.findIndex((type) => type.id === currentTaskType.id);
    // Next task type will be the next item in priority-sorted list
    let nextTaskTypeIndex = currentTaskTypeIndex === sortedTaskTypes.length - 1 ? currentTaskTypeIndex : (currentTaskTypeIndex + 1);
    // Set new task type id
    task.typeId = sortedTaskTypes[nextTaskTypeIndex].id;

    updateTask(task);
    this.change.emit();
    return of(task.id);
  }

  moveTaskPrev(task: Task): Observable<number> {
    let taskTypes = getTypes();
    let currentTaskType = getTypeById(task.typeId);

    let sortedTaskTypes = taskTypes.sort((a,b) => a.priority - b.priority);
    let currentTaskTypeIndex = sortedTaskTypes.findIndex((type) => type.id === currentTaskType.id);
    let prevTaskTypeIndex = currentTaskTypeIndex === 0 ? 0 : (currentTaskTypeIndex - 1);

    task.typeId = sortedTaskTypes[prevTaskTypeIndex].id;

    updateTask(task);
    this.change.emit();
    return of(task.id);
  }

  addTask(title, body): Observable<number> {
    let newTask = addTask(title, body);
    this.change.emit();
    return of(newTask); 
  }
}
