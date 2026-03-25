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

// Render
function renderPosts(){
  const list = $('postsList');
  const posts = loadPosts().sort((a,b)=> b.createdAt.localeCompare(a.createdAt));
  list.innerHTML = '';
  if(posts.length === 0){
    list.innerHTML = '<div class="empty">No hay publicaciones aún.</div>';
    return;
  }
  posts.forEach(post => {
    const card = document.createElement('div');
    card.className = 'post-card';
    card.dataset.id = post.id;

    const left = document.createElement('div');
    left.style.flex = '1';

    const title = document.createElement('h3');
    title.textContent = post.title;
    left.appendChild(title);

    const meta = document.createElement('div');
    meta.className = 'post-meta';
    meta.textContent = `Creado: ${new Date(post.createdAt).toLocaleString()}${post.updatedAt ? ' · Editado: ' + new Date(post.updatedAt).toLocaleString() : ''}`;
    left.appendChild(meta);

    const content = document.createElement('p');
    content.textContent = post.content;
    left.appendChild(content);

    const actions = document.createElement('div');
    actions.className = 'post-actions';

    const editBtn = document.createElement('button');
    editBtn.className = 'btn-edit';
    editBtn.textContent = 'Editar';
    editBtn.onclick = () => startEdit(post.id);

    const delBtn = document.createElement('button');
    delBtn.className = 'btn-delete';
    delBtn.textContent = 'Eliminar';
    delBtn.onclick = () => deletePost(post.id);

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    card.appendChild(left);
    card.appendChild(actions);
    list.appendChild(card);
  });
}

// CRUD
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

// Edit flow
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

// Form handling
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
