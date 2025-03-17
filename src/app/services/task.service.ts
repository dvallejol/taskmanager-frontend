import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// 📌 Interfaz que define la estructura de una tarea
export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;  // Fecha de vencimiento en formato string (YYYY-MM-DD)
  completed: boolean; // Indica si la tarea está completada o no
}

@Injectable({
  providedIn: 'root' // 📌 Hace que este servicio esté disponible en toda la aplicación
})
export class TaskService {
  private apiUrl = 'http://localhost:5146/api/Task'; // 📌 URL de la API en .NET (ajustar según configuración)

  constructor(private http: HttpClient) {}

  /**
   * 📌 Obtener todas las tareas desde la API
   * @returns Observable<Task[]> Lista de tareas
   */
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  /**
   * 📌 Agregar una nueva tarea
   * @param title Título de la tarea
   * @param description Descripción de la tarea
   * @param dueDate Fecha de vencimiento
   * @returns Observable<Task> Tarea creada
   */
  addTask(title: string, description: string, dueDate: string): Observable<Task> {
    const newTask = { title, description, dueDate, completed: false }; // 📌 Nueva tarea con estado inicial "pendiente"
    return this.http.post<Task>(this.apiUrl, newTask);
  }

  /**
   * 📌 Marcar o desmarcar una tarea como completada
   * @param task Tarea a modificar
   * @returns Observable<void>
   */
  toggleTaskCompletion(task: Task): Observable<void> {
    const updatedTask = { ...task, completed: !task.completed }; // 📌 Invierte el estado "completed"
    return this.http.put<void>(`${this.apiUrl}/${task.id}`, updatedTask);
  }

  /**
   * 📌 Eliminar una tarea
   * @param id ID de la tarea a eliminar
   * @returns Observable<void>
   */
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * 📌 Editar una tarea existente
   * @param id ID de la tarea
   * @param title Nuevo título
   * @param description Nueva descripción
   * @param dueDate Nueva fecha de vencimiento
   * @param completed Estado de la tarea
   * @returns Observable<void>
   */
  updateTask(id: number, title: string, description: string, dueDate: string, completed: boolean): Observable<void> {
    const updatedTask = { id, title, description, dueDate, completed }; // 📌 Tarea actualizada
    return this.http.put<void>(`${this.apiUrl}/${id}`, updatedTask);
  }
}
