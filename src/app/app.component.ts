import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule para características básicas de Angular
import { TaskListComponent } from './task-list/task-list.component'; // Importa el componente de lista de tareas

@Component({
  selector: 'app-root', // Nombre del selector que se usará en el HTML
  standalone: true, // ✅ Indica que este componente es standalone (no depende de un módulo)
  templateUrl: './app.component.html', // Archivo de la plantilla HTML del componente
  styleUrls: ['./app.component.css'], // Archivo de estilos CSS para este componente
  imports: [CommonModule, TaskListComponent] // ✅ Importa módulos y componentes necesarios
})

export class AppComponent {
  titulo: string = 'Gestión de tareas'; // ✅ Variable que almacena el título de la aplicación
}

