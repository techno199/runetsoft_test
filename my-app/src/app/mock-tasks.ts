import { Task } from "./task";
import { TaskType } from "./task-types";
import { getTypes } from "./mock-types";

let lastId = 5;

export let tasks: Task[] = [ 
    {
        id: 0,
        typeId: 0,
        body: 'Plan body 1',
        title: 'Plan title 1'
    },
    {
        id: 1,
        typeId: 0,
        body: 'Plan body 2',
        title: 'Plan title 2'
    },
    {
        id: 2,
        typeId: 1,
        body: 'Developing body 1',
        title: 'Developing title 1'
    },
    {
        id: 3,
        typeId: 1,
        body: 'Developing body 2',
        title: 'Developing title 2'
    },
    {
        id: 4,
        typeId: 2,
        body: 'Developing body 3',
        title: 'Developing title 3'
    },
    {
        id: 5,
        typeId: 3,
        body: 'Testing body 1',
        title: 'Testing title 1'
    }
];

export function removeTask(task: Task): number {
    tasks = tasks.filter((t) => t.id !== task.id);
    return task.id;
}

export function getTasks(): Task[] {
    return tasks.map((task) => Object.assign({}, task));
}

export function updateTask(task: Task) {
    let taskIndex = tasks.findIndex((t) => t.id == task.id);
    tasks[taskIndex] = Object.assign(tasks[taskIndex], task);
}

export function addTask(title: string, body: string): number {
    let newId = ++lastId;
    // TODO: check whether any type exists
    let typeId = getTypes().sort((a, b) => a.priority - b.priority)[0].id;

    let newTask: Task = {
        id: newId,
        typeId,
        body,
        title
    }

    tasks.push(newTask);
    return newTask.id;
}