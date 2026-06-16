import { Component, EventEmitter, Output } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  template: `
    <div class="card">
      <h2>➕ Add New Task</h2>
      <div class="form-row">
        <input
          type="text"
          [(ngModel)]="title"
          placeholder="Task title..."
          (keyup.enter)="addTask()"
          class="input-title"
        />
        <input
          type="text"
          [(ngModel)]="description"
          placeholder="Description (optional)"
          class="input-desc"
        />
        <select [(ngModel)]="priority">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button (click)="addTask()" [disabled]="!title.trim() || loading" class="btn-add">
          {{ loading ? 'Adding...' : 'Add Task' }}
        </button>
      </div>
      <p *ngIf="error" class="error">{{ error }}</p>
    </div>
  `,
  styles: [`
    .card { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
    h2 { font-size: 16px; font-weight: 600; color: #1a1a2e; margin-bottom: 1rem; }
    .form-row { display: flex; gap: 8px; flex-wrap: wrap; }
    input, select { height: 40px; padding: 0 12px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 14px; outline: none; transition: border 0.2s; }
    input:focus, select:focus { border-color: #4ade80; }
    .input-title { flex: 2; min-width: 160px; }
    .input-desc { flex: 2; min-width: 160px; }
    select { min-width: 110px; }
    .btn-add { height: 40px; padding: 0 20px; background: #1a1a2e; color: #4ade80; border: none; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; white-space: nowrap; }
    .btn-add:hover { background: #2d2d4e; }
    .btn-add:disabled { opacity: 0.5; cursor: not-allowed; }
    .error { color: #dc2626; font-size: 13px; margin-top: 8px; }
  `]
})
export class TaskFormComponent {
  @Output() taskAdded = new EventEmitter<void>();
  title = '';
  description = '';
  priority: 'low' | 'medium' | 'high' = 'medium';
  loading = false;
  error = '';

  constructor(private taskService: TaskService) {}

  addTask() {
    if (!this.title.trim()) return;
    this.loading = true;
    this.error = '';
    this.taskService.createTask({
      title: this.title.trim(),
      description: this.description.trim(),
      priority: this.priority,
      status: 'pending',
      completed: false
    }).subscribe({
      next: () => {
        this.title = '';
        this.description = '';
        this.priority = 'medium';
        this.loading = false;
        this.taskAdded.emit();
      },
      error: (err) => {
        this.error = 'Failed to add task. Is the backend running?';
        this.loading = false;
      }
    });
  }
}
