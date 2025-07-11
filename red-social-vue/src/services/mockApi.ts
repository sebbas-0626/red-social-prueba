// Servicio mock para frontend sin backend
export const mockApi = {
  // Simular login
  login: async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (email && password) {
      return {
        success: true,
        user: {
          id: 1,
          username: 'Usuario Demo',
          email: email
        }
      }
    }
    
    throw new Error('Credenciales inválidas')
  },

  // Simular registro
  register: async (username: string, email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return {
      success: true,
      user: {
        id: 1,
        username: username,
        email: email
      }
    }
  }
}