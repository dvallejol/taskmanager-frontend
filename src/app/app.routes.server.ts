import { RenderMode, ServerRoute } from '@angular/ssr';

// Definición de rutas específicas para la renderización en el servidor (SSR)
export const serverRoutes: ServerRoute[] = [
  {
    path: '**', // Coincide con cualquier ruta no definida en la aplicación (wildcard)
    renderMode: RenderMode.Prerender // Especifica que la página debe pre-renderizarse en el servidor
  }
];

