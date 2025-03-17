import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:5146/api/Task'; // Asegúrate de que la URL coincida con tu backend .NET Core

  constructor(private http: HttpClient) {}

  // Obtener todas las tareas desde la API
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // Agregar una nueva tarea
  addTask(title: string, description: string, dueDate: string): Observable<Task> {
    const newTask = { title, description, dueDate, completed: false };
    return this.http.post<Task>(this.apiUrl, newTask);
  }

  // Marcar una tarea como completada o pendiente
  toggleTaskCompletion(task: Task): Observable<void> {
    const updatedTask = { ...task, completed: !task.completed };
    return this.http.put<void>(`${this.apiUrl}/${task.id}`, updatedTask);
  }

  // Eliminar una tarea
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Editar una tarea
  updateTask(id: number, title: string, description: string, dueDate: string, completed: boolean): Observable<void> {
    const updatedTask = { id, title, description, dueDate, completed };
    return this.http.put<void>(`${this.apiUrl}/${id}`, updatedTask);
  }
}

