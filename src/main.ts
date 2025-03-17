// 📌 Importa la función para arrancar la aplicación Angular en modo standalone
import { bootstrapApplication } from '@angular/platform-browser';
// 📌 Importa el componente principal de la aplicación
import { AppComponent } from './app/app.component';
// 📌 Importa las utilidades necesarias para manejar rutas
import { provideRouter, Routes } from '@angular/router';
// 📌 Importa la utilidad para habilitar las peticiones HTTP en Angular
import { provideHttpClient } from '@angular/common/http';

// 📌 Importa el servicio de tareas que interactúa con el backend
import { TaskService } from './app/services/task.service';

// 📌 Define las rutas de la aplicación (vacío por ahora, pero aquí se configuran las rutas si es necesario)
const routes: Routes = [];

// 📌 Inicia la aplicación Angular en modo standalone
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),  // 📌 Provee el sistema de enrutamiento de Angular
    provideHttpClient(),    // ✅ Provee HttpClient para manejar peticiones HTTP
    TaskService             // 📌 Provee el servicio de tareas para toda la aplicación
  ],
}).catch(err => console.error(err)); // 📌 Captura errores en caso de fallo en la inicialización

