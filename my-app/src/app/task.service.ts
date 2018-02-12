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

  @Output() change = new EventEmitter<TaskType>();

  getTaskTypes(): Observable<TaskType[]> {
    return of(getTypes());
  }

  getTasks(type: TaskType): Observable<Task[]> {
    return of(getTasks().filter((t) => t.typeId === type.id));
  }

  removeTask(task: Task): Observable<number> {
    let removedId = removeTask(task);
    this.change.emit(getTypeById(task.typeId));
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
    let nextTaskType = sortedTaskTypes[nextTaskTypeIndex];
    // Set new task type id
    task.typeId = nextTaskType.id;

    updateTask(task);
    // Emit changes indicating which task type it was
    this.change.emit(currentTaskType);
    this.change.emit(nextTaskType);
    return of(task.id);
  }

  moveTaskPrev(task: Task): Observable<number> {
    let taskTypes = getTypes();
    let currentTaskType = getTypeById(task.typeId);

    let sortedTaskTypes = taskTypes.sort((a,b) => a.priority - b.priority);
    let currentTaskTypeIndex = sortedTaskTypes.findIndex((type) => type.id === currentTaskType.id);
    let prevTaskTypeIndex = currentTaskTypeIndex === 0 ? 0 : (currentTaskTypeIndex - 1);
    let prevTaskType = sortedTaskTypes[prevTaskTypeIndex];
    task.typeId = prevTaskType.id;

    updateTask(task);
    this.change.emit(currentTaskType);
    this.change.emit(prevTaskType);
    return of(task.id);
  }

  addTask(title, body): Observable<number> {
    let newTask = addTask(title, body);
    let changedColumnType = getTypeById(newTask.id);
    this.change.emit(changedColumnType);
    return of(newTask.id); 
  }
}
