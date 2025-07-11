<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <section class="rounded-md p-4 bg-white shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-2">Bienvenido</h2>
      <p class="text-gray-600 text-center mb-4">
        ¿No tienes una cuenta?
        <router-link to="/register" class="text-black font-semibold">Regístrate</router-link>
      </p>

      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <label class="text-sm font-medium text-gray-700">Correo Electrónico *</label>
          <input
            v-model="dataForm.email"
            placeholder="Correo"
            type="email"
            required
            class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label class="text-sm font-medium text-gray-700">Contraseña *</label>
          <input
            v-model="dataForm.password"
            placeholder="Contraseña"
            type="password"
            required
            class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-black text-white py-2.5 rounded-md font-semibold hover:bg-black/80 transition"
        >
          <span v-if="loading">Cargando...</span>
          <span v-else>Iniciar Sesión</span>
        </button>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { mockApi } from '@/services/mockApi'

const router = useRouter()
const loading = ref(false)

const dataForm = reactive({
  email: '',
  password: ''
})

const onSubmit = async () => {
  loading.value = true
  try {
    await mockApi.login(dataForm.email, dataForm.password)
    router.push('/home')
  } catch (error) {
    console.error('Error:', error)
    alert('Error en el login')
  } finally {
    loading.value = false
  }
}
</script>

