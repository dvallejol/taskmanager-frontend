# Task Manager Frontend

Este repositorio contiene el frontend de la aplicación de gestión de tareas desarrollada en Angular. La aplicación permite agregar, editar, completar y eliminar tareas, con una interfaz intuitiva.

## Requisitos previos
Antes de ejecutar este proyecto en otra máquina, asegúrate de tener instaladas las siguientes herramientas:

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [Angular CLI](https://angular.io/cli) (instalado globalmente)

## Clonación del repositorio
Para obtener una copia local del proyecto, abre una terminal y ejecuta:

```sh
  git clone https://github.com/dvallejol/taskmanager-frontend.git
  cd taskmanager-frontend
```

## Instalación de dependencias
Ejecuta el siguiente comando dentro del directorio del proyecto para instalar las dependencias necesarias:

```sh
  npm install
```

## Configuración del backend
Este frontend se conecta a una API desarrollada en .NET Core. Para que funcione correctamente, debes asegurarte de que el backend esté corriendo en la misma red y que la URL de la API en `task.service.ts` coincida con la dirección del backend.

## Ejecución de la aplicación
Para iniciar el servidor de desarrollo y visualizar la aplicación en el navegador, ejecuta:

```sh
  ng serve
```

Luego, accede a la aplicación desde tu navegador en la dirección:

```
  http://localhost:4200
```

## Capturas de pantalla
### Pantalla principal de la aplicación
![Pantalla principal](./screenshots/main-view.png)

### Edición de una tarea
![Editar tarea](./screenshots/edit-task.png)

## Notas
- Asegúrate de que el backend esté corriendo en la URL configurada en el servicio `task.service.ts`.
- Si deseas cambiar la configuración de la API, actualiza la variable `apiUrl` en `task.service.ts`.



---

🚀 Desplegar Angular en GitHub Pages
1️⃣ Instalar Angular CLI (si no lo tienes)
Si aún no tienes Angular CLI instalado, instálalo con:

sh
Copy
Edit
npm install -g @angular/cli
2️⃣ Agregar Angular CLI para despliegue en GitHub Pages
Desde la raíz de tu proyecto, instala la dependencia necesaria:

sh
Copy
Edit
ng add angular-cli-ghpages
3️⃣ Configurar angular.json para producción
Asegúrate de que angular.json tenga la siguiente configuración en "projects.your-project-name.architect.build.options":

json
Copy
Edit
"outputPath": "dist/taskmanager-frontend",
"baseHref": "/taskmanager-frontend/"
📌 Nota: Reemplaza your-project-name por el nombre de tu aplicación.

4️⃣ Construir la aplicación para producción
Ejecuta el siguiente comando:

sh
Copy
Edit
ng build --configuration production --base-href "https://dvallejol.github.io/taskmanager-frontend/"
Este comando generará los archivos en dist/taskmanager-frontend/.

5️⃣ Publicar en GitHub Pages
Ejecuta:

sh
Copy
Edit
npx angular-cli-ghpages --dir=dist/taskmanager-frontend
Esto desplegará automáticamente la aplicación en GitHub Pages.

6️⃣ Verificar en GitHub Pages
Tu aplicación estará disponible en:

arduino
Copy
Edit
https://dvallejol.github.io/taskmanager-frontend/
🚀 ¡Listo! Tu frontend de Angular ya está en producción en GitHub Pages! 🎉


