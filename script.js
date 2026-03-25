// Estado global de la aplicación
let posts = JSON.parse(localStorage.getItem('posts')) || [];
let editMode = false;
let editingId = null;

// Referencias al DOM
const blogForm = document.getElementById('blog-form');
const postsContainer = document.getElementById('posts-container');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const postIdInput = document.getElementById('post-id');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');

// Inicializar la aplicación
function init() {
    renderPosts();
    blogForm.addEventListener('submit', handleFormSubmit);
    cancelBtn.addEventListener('click', resetForm);
}

// Renderizar las publicaciones
function renderPosts() {
    postsContainer.innerHTML = '';

    if (posts.length === 0) {
        postsContainer.innerHTML = '<p>No hay publicaciones aún. ¡Sé el primero en escribir!</p>';
        return;
    }

    posts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.classList.add('post-card');
        postCard.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <div class="post-actions">
                <button class="edit-btn" onclick="editPost('${post.id}')">Editar</button>
                <button class="delete-btn" onclick="deletePost('${post.id}')">Eliminar</button>
            </div>
        `;
        postsContainer.appendChild(postCard);
    });
}

// Manejar el envío del formulario
function handleFormSubmit(e) {
    e.preventDefault();

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (title && content) {
        if (editMode) {
            // Actualizar post existente
            posts = posts.map(post => {
                if (post.id === editingId) {
                    return { ...post, title, content };
                }
                return post;
            });
            editMode = false;
            editingId = null;
        } else {
            // Crear nuevo post
            const newPost = {
                id: Date.now().toString(),
                title: title,
                content: content,
                date: new Date().toLocaleDateString()
            };
            posts.unshift(newPost); // Agregar al inicio de la lista
        }

        saveToLocalStorage();
        renderPosts();
        resetForm();
    }
}

// Guardar en localStorage
function saveToLocalStorage() {
    localStorage.setItem('posts', JSON.stringify(posts));
}

// Eliminar un post
window.deletePost = function(id) {
    if (confirm('¿Estás seguro de que deseas eliminar esta publicación?')) {
        posts = posts.filter(post => post.id !== id);
        saveToLocalStorage();
        renderPosts();
    }
};

// Preparar formulario para edición
window.editPost = function(id) {
    const postToEdit = posts.find(post => post.id === id);
    if (postToEdit) {
        titleInput.value = postToEdit.title;
        contentInput.value = postToEdit.content;
        postIdInput.value = postToEdit.id;
        
        editMode = true;
        editingId = id;
        
        submitBtn.textContent = 'Actualizar';
        cancelBtn.style.display = 'inline-block';
        
        // Desplazarse suavemente al formulario
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

// Limpiar formulario y restablecer estados
function resetForm() {
    blogForm.reset();
    postIdInput.value = '';
    editMode = false;
    editingId = null;
    submitBtn.textContent = 'Publicar';
    cancelBtn.style.display = 'none';
}

// Iniciar la aplicación al cargar el DOM
document.addEventListener('DOMContentLoaded', init);
