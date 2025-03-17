import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common'; // ✅ Importar NgFor
import { TaskListComponent } from './task-list/task-list.component';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-root',
  //imports: [RouterOutlet],
  standalone: true, // ✅ Esto indica que es un componente standalone
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, TaskListComponent] // ✅ 
})

export class AppComponent  {
  titulo : string = 'Gestion de tareas';
  
}
