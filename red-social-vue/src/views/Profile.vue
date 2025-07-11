<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <router-link to="/home" class="text-xl font-semibold">Red Social</router-link>
          </div>
          <div class="flex items-center space-x-4">
            <router-link to="/home" class="text-gray-700 hover:text-gray-900">
              Inicio
            </router-link>
            <router-link to="/login" class="text-gray-700 hover:text-gray-900">
              Salir
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <div class="max-w-4xl mx-auto py-8 px-4">
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <div class="flex items-center space-x-6">
          <div class="w-24 h-24 bg-gray-300 rounded-full"></div>
          <div class="flex-1">
            <h1 class="text-2xl font-bold text-gray-900">Usuario Demo</h1>
            <p class="text-gray-600">demo@ejemplo.com</p>
            <p class="text-gray-500 mt-2">Usuario de demostración de la red social</p>
            <div class="flex space-x-4 mt-4">
              <span class="text-sm text-gray-500">
                <strong>150</strong> seguidores
              </span>
              <span class="text-sm text-gray-500">
                <strong>89</strong> siguiendo
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Posts del usuario -->
      <div class="space-y-6">
        <h2 class="text-xl font-semibold text-gray-900">Mis Publicaciones</h2>
        <div
          v-for="post in userPosts"
          :key="post.id"
          class="bg-white rounded-lg shadow p-6"
        >
          <p class="text-gray-900 mb-4">{{ post.content }}</p>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-500">{{ post.date }}</span>
            <div class="flex items-center space-x-1">
              <span>❤️</span>
              <span class="text-sm text-gray-500">{{ post.likes }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const userPosts = ref([
  {
    id: 1,
    content: 'Mi primera publicación en la red social',
    likes: 5,
    date: 'Hace 2 horas'
  },
  {
    id: 2,
    content: 'Compartiendo mis pensamientos del día',
    likes: 8,
    date: 'Hace 1 día'
  }
])
</script>