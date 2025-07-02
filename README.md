# PC-DAW-FRONTEND 🖥️

**Parte del Proyecto Principal:** [https://github.com/Vania-0731/PC4-DAW](https://github.com/Vania-0731/PC4-DAW)

Bienvenida al frontend de la aplicación PC-DAW (Programación Concurrente y Distribuida de Aplicaciones Web). Este proyecto es la interfaz de usuario construida con React, que interactúa con la API RESTful del backend para gestionar productos, categorías y autenticación de usuarios.

---

## 📋 Tabla de Contenidos

1.  [Acerca del Proyecto](#-acerca-del-proyecto)
2.  [Tecnologías Utilizadas](#-tecnologías-utilizadas)
3.  [Funcionalidades](#-funcionalidades)
4.  [Configuración del Entorno Local](#-configuración-del-entorno-local)
5.  [Despliegue en Vercel](#-despliegue-en-vercel)
6.  [Estructura del Proyecto](#-estructura-del-proyecto)
7.  [Licencia](#-licencia)
8.  [Contacto](#-contacto)

---

## 💡 Acerca del Proyecto

Este es el cliente web de la aplicación PC-DAW, diseñado para ofrecer una experiencia de usuario intuitiva para la gestión de un catálogo de productos y categorías. Se conecta a un backend de Spring Boot para todas las operaciones de datos y autenticación, utilizando JWT para la seguridad.

### Características Clave:

* **Single Page Application (SPA):** Desarrollada con React.
* **Interfaz de Usuario Responsiva:** Adaptable a diferentes tamaños de pantalla.
* **Gestión de Catálogo:** Permite crear, leer, actualizar y eliminar productos y categorías.
* **Autenticación de Usuario:** Funcionalidades de registro e inicio de sesión.
* **Protección de Rutas:** Acceso restringido a ciertas partes de la aplicación basado en la autenticación y roles de usuario.
* **Conexión con Backend RESTful:** Interacción fluida con la API del backend.

---

## 🛠️ Tecnologías Utilizadas

* **React:** Biblioteca de JavaScript para construir interfaces de usuario.
* **Vite:** Herramienta de construcción rápida para proyectos frontend (o Create React App, si ese es tu caso).
* **Axios:** Cliente HTTP para realizar peticiones al backend.
* **Zustand:** Librería de gestión de estado ligero para React.
* **React Router DOM:** Para la navegación y el enrutamiento dentro de la SPA.
* **HTML5, CSS3, JavaScript (ES6+):** Estándares web.
* **Vercel:** Plataforma de despliegue continuo.

---

## 🚀 Funcionalidades

* **Página de Inicio:** Vista general de productos.
* **Registro de Usuarios:** Permite a nuevos usuarios crear una cuenta.
* **Inicio de Sesión:** Autenticación de usuarios existentes.
* **Gestión de Productos:** Añadir, ver detalles, editar y eliminar productos (requiere autenticación, algunas acciones pueden requerir rol ADMIN).
* **Gestión de Categorías:** Añadir, ver y editar categorías (requiere autenticación, algunas acciones pueden requerir rol ADMIN).
* **Panel de Administración:** Acceso exclusivo para usuarios con rol ADMIN para la gestión de usuarios.

---

## 💻 Configuración del Entorno Local

Para levantar el proyecto en tu máquina local:

1.  **Clona el repositorio:**
    ```bash
    git clone [https://github.com/Vania-0731/PC-DAW-FRONTEND.git](https://github.com/Vania-0731/PC-DAW-FRONTEND.git)
    cd PC-DAW-FRONTEND
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    # o si usas yarn:
    # yarn install
    ```

3.  **Configura la URL del Backend:**
    Abre el archivo `src/api.js` y asegúrate de que `baseURL` apunte a tu backend de Spring Boot. Si estás desarrollando localmente, apúntalo a `localhost`. Si vas a probar con el backend desplegado en Render, usa su URL.

    ```javascript
    // src/api.js
    const api = axios.create({
      // Si el backend está local:
      // baseURL: 'http://localhost:8080/api/v1',
      // Si el backend está en Render:
      baseURL: '[https://pc-daw-backend-app.onrender.com/api/v1](https://pc-daw-backend-app.onrender.com/api/v1)', // <-- Usar esta para interactuar con tu backend desplegado
    });
    ```

4.  **Ejecuta la aplicación:**
    ```bash
    npm run dev
    # o si usas yarn:
    # yarn dev
    ```

La aplicación estará disponible en `http://localhost:5173` (o el puerto que te indique Vite/Create React App).

---

## ☁️ Despliegue en Vercel

Este frontend está configurado para un despliegue continuo en Vercel.

### Pasos para Desplegar:

1.  **Configura la URL del Backend en `src/api.js`:**
    Antes de hacer el push final para el despliegue, asegúrate de que la `baseURL` en `src/api.js` apunte a la URL de tu backend desplegado en Render:
    ```javascript
    baseURL: '[https://pc-daw-backend-app.onrender.com/api/v1](https://pc-daw-backend-app.onrender.com/api/v1)',
    ```

2.  **Sube tu código a GitHub:**
    Asegúrate de que todos los cambios estén en tu repositorio de GitHub (`https://github.com/Vania-0731/PC-DAW-FRONTEND.git`).

3.  **Conecta con Vercel:**
    * Si aún no tienes una cuenta, regístrate en [vercel.com](https://vercel.com/) (se recomienda usar GitHub para un enlace fácil).
    * En tu panel de Vercel, haz clic en **"Add New..." > "Project"**.
    * Selecciona tu repositorio de GitHub `Vania-0731/PC-DAW-FRONTEND`.

4.  **Configuración del Proyecto en Vercel:**
    * Vercel debería detectar automáticamente que es un proyecto de React.
    * **Build Command:** `npm run build` (o `yarn build`).
    * **Output Directory:** `dist` (o `build`, dependiendo de tu configuración de Vite/Create React App).
    * No se requieren variables de entorno adicionales si la `baseURL` del backend está directamente en `src/api.js`.

5.  **Deploy:**
    Haz clic en "Deploy". Vercel construirá y desplegará tu aplicación. Una vez completado, te proporcionará una URL (ej. `https://pc-daw-frontend.vercel.app`) donde tu aplicación estará accesible.

---

## 📂 Estructura del Proyecto

Una breve descripción de la estructura de carpetas:

* `public/`: Archivos estáticos.
* `src/`: Código fuente de la aplicación.
    * `assets/`: Imágenes, iconos, etc.
    * `components/`: Componentes React reutilizables.
    * `pages/`: Componentes que representan páginas/vistas.
    * `services/`: Módulos para la interacción con la API del backend.
        * `api.js`: Configuración base de Axios y interceptores.
        * `authService.js`: Funciones para registro, login, etc.
        * `categoriaService.js`: Funciones para gestionar categorías.
        * `productoService.js`: Funciones para gestionar productos.
        * `userService.js`: Funciones para gestionar usuarios.
    * `store/`: Gestión de estado con Zustand.
    * `App.js`: Componente principal de la aplicación.
    * `main.jsx`: Punto de entrada de la aplicación.
    * `index.css`: Estilos globales.

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

## ✉️ Contacto

Para cualquier consulta o sugerencia, no dudes en contactar a:

* Sonaly Sifuentes - [sonalysifuentes@gmail.com](mailto:sonalysifuentes@gmail.com)
* GitHub: [Vania-0731](https://github.com/Vania-0731)

---
