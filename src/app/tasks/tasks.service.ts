import { Injectable, signal } from '@angular/core';

import type { Task, TaskStatus } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks = signal<Task[]>([]);

  allTasks = this.tasks.asReadonly();

  addTask(taskData: { title: string; description: string }) {
    const newTask: Task = {
      id: Math.random().toString(),
      title: taskData.title,
      description: taskData.description,
      status: 'OPEN',
    };
    this.tasks.update((x) => [...x, newTask]);
  }

  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update((x) =>
      x.map((item) =>
        item.id === taskId ? { ...item, status: newStatus } : item
      )
    );
  }
}
