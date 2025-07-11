<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <section class="rounded-md p-4 bg-white shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-2">Registrarte</h2>
      <p class="text-gray-600 text-center mb-4">
        ¿Ya tienes una cuenta?
        <router-link to="/login" class="text-black font-semibold">Inicia Sesión</router-link>
      </p>

      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <label class="text-sm font-medium text-gray-700">Usuario *</label>
          <input
            v-model="dataForm.username"
            required
            placeholder="Usuario"
            type="text"
            class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label class="text-sm font-medium text-gray-700">Correo Electrónico *</label>
          <input
            v-model="dataForm.email"
            required
            type="email"
            placeholder="Correo"
            class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label class="text-sm font-medium text-gray-700">Contraseña *</label>
          <input
            v-model="dataForm.password"
            required
            type="password"
            placeholder="Contraseña"
            class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-black text-white py-2.5 rounded-md font-semibold hover:bg-black/80 transition"
        >
          Registrarse
        </button>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const dataForm = reactive({
  username: '',
  email: '',
  password: ''
})

const onSubmit = () => {
  console.log('Registro:', dataForm)
  router.push('/login')
}
</script>
