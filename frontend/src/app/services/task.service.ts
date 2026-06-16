import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Task {
  _id?: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'done';
  completed: boolean;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) {}

  getTasks(): Observable<{ success: boolean; data: Task[] }> {
    return this.http.get<{ success: boolean; data: Task[] }>(this.apiUrl);
  }

  createTask(task: Partial<Task>): Observable<{ success: boolean; data: Task }> {
    return this.http.post<{ success: boolean; data: Task }>(this.apiUrl, task);
  }

  updateTask(id: string, task: Partial<Task>): Observable<{ success: boolean; data: Task }> {
    return this.http.put<{ success: boolean; data: Task }>(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: string): Observable<{ success: boolean; message: string }> {
    return this.http.delete<{ success: boolean; message: string }>(`${this.apiUrl}/${id}`);
  }
}
