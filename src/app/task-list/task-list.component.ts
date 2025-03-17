import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from '../services/task.service'; // ✅ Importamos el servicio de tareas
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule], // ✅ Módulos necesarios para formularios y estructura
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  // 📌 Formulario reactivo para manejar la creación y edición de tareas
  taskForm: FormGroup;
  editMode = false; // 📌 Modo edición activado/desactivado
  taskBeingEdited: Task | null = null; // 📌 Almacena la tarea en edición
  searchQuery = ''; // 📌 Filtro de búsqueda (aún no implementado)
  tasks: Task[] = []; // 📌 Lista de tareas obtenidas del backend
  filterStatus: string = 'all'; // 📌 Filtro de tareas ('all' | 'pending' | 'completed')

  constructor(private fb: FormBuilder, public taskService: TaskService) {
    // 📌 Configuración del formulario con validaciones
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]], // El título debe tener al menos 3 caracteres
      description: ['', [Validators.required, Validators.minLength(5)]], // La descripción debe tener al menos 5 caracteres
      dueDate: ['', Validators.required] // La fecha de vencimiento es obligatoria
    });
  }

  ngOnInit(): void {
    this.loadTasks(); // Cargar las tareas al iniciar el componente
  }

  // 🔹 Cargar las tareas desde el backend
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

  // 🔹 Agregar una nueva tarea o actualizar una existente
  addOrUpdateTask(): void {
    if (this.taskForm.valid) {
      const { title, description, dueDate } = this.taskForm.value;
      const formattedDate = new Date(dueDate).toISOString().split('T')[0]; // 📌 Formatea la fecha a YYYY-MM-DD

      if (this.editMode && this.taskBeingEdited) {
        // 🔹 Si estamos en modo edición, actualizamos la tarea existente
        this.taskService.updateTask(this.taskBeingEdited.id, title, description, formattedDate, this.taskBeingEdited.completed)
          .subscribe(() => {
            this.loadTasks(); // Recargar la lista de tareas
            this.resetForm(); // Limpiar el formulario
          });
      } else {
        // 🔹 Si no estamos en edición, agregamos una nueva tarea
        this.taskService.addTask(title, description, formattedDate).subscribe(() => {
          this.loadTasks();
          this.resetForm();
        });
      }
    }
  }

  // 🔹 Alternar el estado de completado de una tarea
  toggleTaskCompletion(task: Task): void {
    this.taskService.toggleTaskCompletion(task).subscribe(() => {
      this.loadTasks();
    });
  }

  // 🔹 Eliminar una tarea por su ID
  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }

  // 🔹 Editar una tarea, rellenando el formulario con los valores actuales
  editTask(task: Task): void {
    this.taskBeingEdited = task;
    this.editMode = true;

    let formattedDate = '';

    // 📌 Validar si la fecha es válida antes de asignarla
    if (task.dueDate) {
      const parsedDate = new Date(task.dueDate);
      if (!isNaN(parsedDate.getTime())) {
        formattedDate = parsedDate.toISOString().split('T')[0]; // Convierte a formato YYYY-MM-DD
      } else {
        console.warn('⚠️ Fecha inválida detectada:', task.dueDate);
      }
    }

    console.log('✅ Fecha formateada:', formattedDate);

    // 📌 Rellenar el formulario con los valores de la tarea seleccionada
    this.taskForm.patchValue({
      title: task.title,
      description: task.description,
      dueDate: formattedDate
    });
  }

  // 🔹 Restablecer el formulario después de agregar/editar una tarea
  resetForm(): void {
    this.taskForm.reset();
    this.editMode = false;
    this.taskBeingEdited = null;
  }

  // 🔹 Filtrar tareas según el estado seleccionado (todas, pendientes o completadas)
  get filteredTasks(): Task[] {
    return this.tasks.filter(task => {
      if (this.filterStatus === 'pending') return !task.completed;
      if (this.filterStatus === 'completed') return task.completed;
      return true; // 'all' muestra todas las tareas
    });
  }

  // 🔹 Obtener el número de tareas pendientes
  get pendingTasksCount(): number {
    return this.tasks.filter(task => !task.completed).length;
  }
}
