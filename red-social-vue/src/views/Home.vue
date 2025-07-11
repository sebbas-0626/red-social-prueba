<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold">Red Social</h1>
          </div>
          <div class="flex items-center space-x-4">
            <router-link to="/profile" class="text-gray-700 hover:text-gray-900">
              Perfil
            </router-link>
            <router-link to="/login" class="text-gray-700 hover:text-gray-900">
              Salir
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <div class="max-w-2xl mx-auto py-8 px-4">
      <!-- Crear Post -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <textarea
          v-model="newPost"
          placeholder="¿Qué estás pensando?"
          class="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="3"
        ></textarea>
        <div class="mt-4 flex justify-end">
          <button
            @click="createPost"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Publicar
          </button>
        </div>
      </div>

      <!-- Posts -->
      <div class="space-y-6">
        <div
          v-for="post in posts"
          :key="post.id"
          class="bg-white rounded-lg shadow p-6"
        >
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-900">{{ post.username }}</p>
              <p class="text-sm text-gray-500">{{ post.date }}</p>
            </div>
          </div>
          <p class="text-gray-900 mb-4">{{ post.content }}</p>
          <div class="flex items-center space-x-4">
            <button
              @click="toggleLike(post.id)"
              class="flex items-center space-x-1 text-gray-500 hover:text-red-500"
            >
              <span>❤️</span>
              <span>{{ post.likes }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const newPost = ref('')
const posts = ref([
  {
    id: 1,
    username: 'Usuario Demo',
    content: 'Mi primera publicación en la red social',
    likes: 5,
    date: 'Hace 2 horas'
  },
  {
    id: 2,
    username: 'Ana García',
    content: '¡Hola mundo! Este es mi primer post',
    likes: 12,
    date: 'Hace 4 horas'
  },
  {
    id: 3,
    username: 'Carlos López',
    content: 'Compartiendo mis pensamientos del día',
    likes: 8,
    date: 'Hace 6 horas'
  }
])

const createPost = () => {
  if (!newPost.value.trim()) return
  
  const post = {
    id: posts.value.length + 1,
    username: 'Usuario Demo',
    content: newPost.value,
    likes: 0,
    date: 'Ahora'
  }
  
  posts.value.unshift(post)
  newPost.value = ''
}

const toggleLike = (postId: number) => {
  const post = posts.value.find(p => p.id === postId)
  if (post) {
    post.likes++
  }
}
</script>