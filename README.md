# Simple Blog - Proyecto de Ingeniería de Software

Este es un proyecto base para la gestión de publicaciones de un blog, desarrollado con HTML, CSS y JavaScript puro.

## Funcionalidades
- **Crear posts:** Formulario para agregar nuevas publicaciones.
- **Listar posts:** Visualización dinámica de las publicaciones existentes.
- **Editar posts:** Capacidad de modificar contenido y títulos.
- **Eliminar posts:** Opción para borrar publicaciones con confirmación.
- **Persistencia:** Los datos se guardan en el `localStorage` del navegador.

---

## Guía para el Equipo (Rúbrica)

### 1. Subir a GitHub por primera vez (Líder del proyecto)
Desde la terminal en la carpeta del proyecto:
```bash
git init
git add .
git commit -m "feat: estructura inicial del proyecto"
git remote add origin https://github.com/SoyPhilips/simpleblog.git
git branch -M main
git push -u origin main
```

### 2. Flujo de Trabajo con Ramas (Integrantes)
Antes de trabajar en una funcionalidad, crea una rama propia:
```bash
# Asegúrate de estar en main y actualizado
git checkout main
git pull origin main

# Crear y cambiar a una nueva rama
git checkout -b feature-crear-posts
```

### 3. Realizar Cambios y Commits
Realiza cambios pequeños y frecuentes con mensajes claros:
```bash
git add .
git commit -m "docs: actualizar README con instrucciones"
git push origin feature-crear-posts
```

### 4. Pull Requests y Code Review
Una vez terminada la funcionalidad:
1. Ve a GitHub y crea un **Pull Request (PR)**.
2. Asígnale un revisor (uno de tus compañeros).
3. El compañero debe revisar el código, dejar comentarios y aprobar si está correcto.
4. Realizar el **Merge** una vez aprobado.

---

## Estructura del Proyecto
- `index.html`: Estructura principal de la web.
- `style.css`: Estilos visuales.
- `script.js`: Lógica de la aplicación y manejo del DOM.
