import { TaskType } from "./task-types";

export let types: TaskType[] = [
    {
        id: 0,
        name: 'Planning',
        priority: 0
    },
    {
        id: 1,
        name: 'Developing',
        priority: 1
    },
    {
        id: 2,
        name: 'Testing',
        priority: 2
    },
    {
        id: 3,
        name: 'Ready',
        priority: 3
    }
]

export function getTypes(): TaskType[] {
    return types.map((type) => Object.assign({}, type));
}

export function getTypeById(id: number): TaskType | null {
    let type = types.filter((t) => t.id === id);
    return type.length ? type[0] : null;
}