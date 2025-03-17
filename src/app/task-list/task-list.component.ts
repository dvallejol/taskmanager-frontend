import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../services/task.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  taskForm: FormGroup;
  editMode = false;
  taskBeingEdited: Task | null = null;
  searchQuery = '';
  tasks: Task[] = []; // Lista de tareas obtenidas del backend
  filterStatus: string = 'all'; // 'all' | 'pending' | 'completed'

  constructor(private fb: FormBuilder, public taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      dueDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        console.log('Tareas obtenidas:', tasks); // 🛠 Verifica en consola
        this.tasks = tasks;
      },
      error: (err) => {
        console.error('Error al obtener tareas:', err);
      }
    });
  }

  addOrUpdateTask(): void {
    if (this.taskForm.valid) {
      const { title, description, dueDate } = this.taskForm.value;
      const formattedDate = new Date(dueDate).toISOString().split('T')[0]; // Formatea la fecha
  
      if (this.editMode && this.taskBeingEdited) {
        // Actualizar tarea existente
        this.taskService.updateTask(this.taskBeingEdited.id, title, description, formattedDate, this.taskBeingEdited.completed)
          .subscribe(() => {
            this.loadTasks(); // Recargar tareas después de la actualización
            this.resetForm(); // Resetear el formulario
          });
      } else {
        // Agregar nueva tarea
        this.taskService.addTask(title, description, formattedDate).subscribe(() => {
          this.loadTasks();
          this.resetForm();
        });
      }
    }
  }
  

  toggleTaskCompletion(task: Task): void {
    this.taskService.toggleTaskCompletion(task).subscribe(() => {
      this.loadTasks();
    });
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }

  editTask(task: Task): void {
    //console.log('📌 Tarea a editar:', task);
    //console.log('📌 Valor original de dueDate:', task.dueDate);
  
    this.taskBeingEdited = task;
    this.editMode = true;
  
    let formattedDate = '';
  
    // Verificar si la fecha es válida antes de convertirla
    if (task.dueDate) {
      const parsedDate = new Date(task.dueDate);
  
      if (!isNaN(parsedDate.getTime())) {
        formattedDate = parsedDate.toISOString().split('T')[0]; // Convierte a YYYY-MM-DD
      } else {
        console.warn('⚠️ Fecha inválida detectada:', task.dueDate);
      }
    }
  
    console.log('✅ Fecha formateada:', formattedDate);
  
    this.taskForm.patchValue({
      title: task.title,
      description: task.description,
      dueDate: formattedDate  // Asigna la fecha corregida o vacío si era inválida
    });
  }
  
  

  resetForm(): void {
    this.taskForm.reset();
    this.editMode = false;
    this.taskBeingEdited = null;
  }

  get filteredTasks(): Task[] {
    return this.tasks.filter(task => {
      if (this.filterStatus === 'pending') return !task.completed;
      if (this.filterStatus === 'completed') return task.completed;
      return true; // 'all' muestra todas
    });
  }

  get pendingTasksCount(): number {
    return this.tasks.filter(task => !task.completed).length;
  }
}
