import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  template: `
    <div class="card">
      <!-- Stats -->
      <div class="stats">
        <div class="stat"><span class="num">{{ tasks.length }}</span><span class="lbl">Total</span></div>
        <div class="stat"><span class="num">{{ doneCount }}</span><span class="lbl">Done</span></div>
        <div class="stat"><span class="num">{{ pendingCount }}</span><span class="lbl">Pending</span></div>
        <div class="stat"><span class="num">{{ highCount }}</span><span class="lbl">High Priority</span></div>
      </div>

      <!-- Filter Bar -->
      <div class="filter-bar">
        <button *ngFor="let f of filters" (click)="activeFilter = f" [class.active]="activeFilter === f" class="filter-btn">
          {{ f | titlecase }}
        </button>
      </div>

      <!-- Loading -->
      <div *ngIf="loading" class="center">Loading tasks from MongoDB...</div>

      <!-- Error -->
      <div *ngIf="error" class="center error">⚠️ {{ error }}</div>

      <!-- Empty -->
      <div *ngIf="!loading && !error && filteredTasks.length === 0" class="center">No tasks found. Add one above!</div>

      <!-- Task List -->
      <div class="task-list" *ngIf="!loading && !error">
        <div *ngFor="let task of filteredTasks" class="task" [class.done]="task.completed">
          <div class="task-check" [class.checked]="task.completed" (click)="toggleTask(task)">
            <span *ngIf="task.completed">✓</span>
          </div>
          <div class="task-info">
            <div class="task-title">{{ task.title }}</div>
            <div class="task-desc" *ngIf="task.description">{{ task.description }}</div>
          </div>
          <span class="priority-badge" [class]="'p-' + task.priority">{{ task.priority }}</span>
          <select [(ngModel)]="task.status" (change)="updateStatus(task)" class="status-select">
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <button (click)="deleteTask(task._id!)" class="btn-delete">🗑</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
    .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 1.5rem; }
    .stat { background: #f8fafc; border-radius: 8px; padding: 12px; text-align: center; }
    .num { display: block; font-size: 24px; font-weight: 700; color: #1a1a2e; }
    .lbl { display: block; font-size: 11px; color: #64748b; margin-top: 2px; }
    .filter-bar { display: flex; gap: 6px; margin-bottom: 1rem; flex-wrap: wrap; }
    .filter-btn { padding: 5px 14px; border-radius: 20px; border: 1.5px solid #e2e8f0; background: none; font-size: 12px; color: #64748b; cursor: pointer; }
    .filter-btn.active { background: #1a1a2e; color: #4ade80; border-color: #1a1a2e; }
    .center { text-align: center; padding: 2rem; color: #64748b; }
    .error { color: #dc2626; }
    .task-list { display: flex; flex-direction: column; gap: 8px; }
    .task { display: flex; align-items: center; gap: 10px; padding: 12px 14px; background: #f8fafc; border-radius: 10px; border: 1.5px solid #e2e8f0; transition: opacity 0.2s; }
    .task.done { opacity: 0.55; }
    .task-check { width: 22px; height: 22px; border-radius: 50%; border: 2px solid #cbd5e1; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0; color: #14532d; font-weight: bold; }
    .task-check.checked { background: #4ade80; border-color: #4ade80; }
    .task-info { flex: 1; min-width: 0; }
    .task-title { font-size: 14px; font-weight: 500; color: #1e293b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .task.done .task-title { text-decoration: line-through; color: #94a3b8; }
    .task-desc { font-size: 12px; color: #64748b; margin-top: 2px; }
    .priority-badge { font-size: 10px; font-weight: 600; padding: 3px 8px; border-radius: 4px; flex-shrink: 0; text-transform: capitalize; }
    .p-high { background: #fce4ec; color: #880e4f; }
    .p-medium { background: #fff3e0; color: #e65100; }
    .p-low { background: #e3f2fd; color: #0d47a1; }
    .status-select { height: 30px; padding: 0 6px; border: 1.5px solid #e2e8f0; border-radius: 6px; font-size: 12px; background: white; }
    .btn-delete { background: none; border: none; cursor: pointer; font-size: 16px; opacity: 0.5; padding: 4px; border-radius: 6px; }
    .btn-delete:hover { opacity: 1; background: #fee2e2; }
  `]
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  loading = false;
  error = '';
  activeFilter = 'all';
  filters = ['all', 'pending', 'in-progress', 'done', 'high'];

  get filteredTasks() {
    if (this.activeFilter === 'all') return this.tasks;
    if (this.activeFilter === 'high') return this.tasks.filter(t => t.priority === 'high');
    return this.tasks.filter(t => t.status === this.activeFilter);
  }
  get doneCount() { return this.tasks.filter(t => t.completed).length; }
  get pendingCount() { return this.tasks.filter(t => !t.completed).length; }
  get highCount() { return this.tasks.filter(t => t.priority === 'high' && !t.completed).length; }

  constructor(private taskService: TaskService) {}

  ngOnInit() { this.loadTasks(); }

  loadTasks() {
    this.loading = true;
    this.error = '';
    this.taskService.getTasks().subscribe({
      next: (res) => { this.tasks = res.data; this.loading = false; },
      error: () => { this.error = 'Cannot connect to backend. Make sure Express server is running on port 3000.'; this.loading = false; }
    });
  }

  toggleTask(task: Task) {
    this.taskService.updateTask(task._id!, { completed: !task.completed }).subscribe({
      next: () => this.loadTasks()
    });
  }

  updateStatus(task: Task) {
    const completed = task.status === 'done';
    this.taskService.updateTask(task._id!, { status: task.status, completed }).subscribe();
  }

  deleteTask(id: string) {
    if (!confirm('Delete this task?')) return;
    this.taskService.deleteTask(id).subscribe({ next: () => this.loadTasks() });
  }
}
