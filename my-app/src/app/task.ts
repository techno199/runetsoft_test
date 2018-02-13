import { TaskType } from "./task-types";

export class Task {
    id: number;
    typeId: number;
    title: string = "Task title";
    body: string = "Task body";
    state: string = 'active';
}