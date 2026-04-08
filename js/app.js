// app.js - Lógica CRUD con localStorage
const STORAGE_KEY = 'blog_simple_posts_v1';

// Utilidades
const $ = id => document.getElementById(id);
const nowISO = () => new Date().toISOString();

// Modelo: obtener y guardar posts
function loadPosts(){
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}
function savePosts(posts){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

// Render ('renderizar' o 'mostrar en pantalla')
// Render
function updateStats(posts) {
  const total = $('totalPosts');
  const last = $('lastActivity');
  if (total) total.textContent = posts.length;
  if (last && posts.length > 0) {
    const latest = posts.reduce((a, b) => (a.updatedAt || a.createdAt) > (b.updatedAt || b.createdAt) ? a : b);
    const date = latest.updatedAt || latest.createdAt;
    last.textContent = new Date(date).toLocaleDateString();
  } else if (last) {
    last.textContent = 'Sin actividad';
  }
}

function renderPosts(){
  const list = $('postsList');
  const posts = loadPosts().sort((a,b)=> (b.updatedAt || b.createdAt).localeCompare(a.updatedAt || a.createdAt));
  updateStats(posts);
  list.innerHTML = '';
  
  if(posts.length === 0){
    list.innerHTML = '<div class="empty">No hay publicaciones aún. ¡Sé el primero en escribir algo!</div>';
    return;
  }
  
  posts.forEach(post => {
    const card = document.createElement('div');
    card.className = 'post-card';
    card.dataset.id = post.id;

    const header = document.createElement('div');
    header.className = 'post-header';

    const title = document.createElement('h3');
    title.className = 'post-title';
    title.textContent = post.title;
    header.appendChild(title);
    card.appendChild(header);

    const content = document.createElement('div');
    content.className = 'post-content';
    content.textContent = post.content;
    card.appendChild(content);

    const footer = document.createElement('div');
    footer.className = 'post-footer';

    const meta = document.createElement('div');
    meta.className = 'post-meta';
    const date = post.updatedAt || post.createdAt;
    meta.textContent = `${post.updatedAt ? 'Editado' : 'Publicado'} el ${new Date(date).toLocaleString()}`;
    footer.appendChild(meta);

    const actions = document.createElement('div');
    actions.className = 'post-actions';

    const editBtn = document.createElement('button');
    editBtn.className = 'btn-edit';
    editBtn.innerHTML = '✎';
    editBtn.title = 'Editar';
    editBtn.onclick = () => startEdit(post.id);

    const delBtn = document.createElement('button');
    delBtn.className = 'btn-delete';
    delBtn.innerHTML = '🗑';
    delBtn.title = 'Eliminar';
    delBtn.onclick = () => deletePost(post.id);

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);
    footer.appendChild(actions);

    card.appendChild(footer);
    list.appendChild(card);
  });
}

// CRUD (crear, leer, actualizar, eliminar)
function createPost(title, content){
  const posts = loadPosts();
  const post = {
    id: cryptoRandomId(),
    title,
    content,
    createdAt: nowISO(),
    updatedAt: null
  };
  posts.push(post);
  savePosts(posts);
  renderPosts();
  return post;
}

function updatePost(id, title, content){
  const posts = loadPosts();
  const idx = posts.findIndex(p => p.id === id);
  if(idx === -1) return null;
  posts[idx].title = title;
  posts[idx].content = content;
  posts[idx].updatedAt = nowISO();
  savePosts(posts);
  renderPosts();
  return posts[idx];
}

function deletePost(id){
  if(!confirm('¿Eliminar esta publicación?')) return;
  const posts = loadPosts().filter(p => p.id !== id);
  savePosts(posts);
  renderPosts();
}

// Edit flow (flujo de edicion)
function startEdit(id){
  const posts = loadPosts();
  const post = posts.find(p => p.id === id);
  if(!post) return alert('Publicación no encontrada');
  $('postId').value = post.id;
  $('title').value = post.title;
  $('content').value = post.content;
  $('title').focus();
}

function resetForm(){
  $('postId').value = '';
  $('title').value = '';
  $('content').value = '';
}

// Form handling (manejo de formularios)
document.addEventListener('DOMContentLoaded', () => {
  renderPosts();

  $('postForm').addEventListener('submit', e => {
    e.preventDefault();
    const id = $('postId').value.trim();
    const title = $('title').value.trim();
    const content = $('content').value.trim();
    if(!title || !content) return alert('Título y contenido son obligatorios.');
    if(id){
      updatePost(id, title, content);
    } else {
      createPost(title, content);
    }
    resetForm();
  });

  $('cancelBtn').addEventListener('click', () => resetForm());
});

// Generador simple de id (suficiente para demo)
function cryptoRandomId(){
  return 'p_' + Math.random().toString(36).slice(2,9);
}
