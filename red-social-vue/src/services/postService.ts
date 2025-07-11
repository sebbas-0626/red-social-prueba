// Servicio mock para posts
const mockPosts = [
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
]

export const postService = {
  // Obtener todos los posts
  getPosts: async () => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return [...mockPosts]
  },

  // Crear nuevo post
  createPost: async (content: string) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const newPost = {
      id: mockPosts.length + 1,
      username: 'Usuario Demo',
      content: content,
      likes: 0,
      date: 'Ahora'
    }
    
    mockPosts.unshift(newPost)
    return newPost
  },

  // Dar like a un post
  likePost: async (postId: number) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const post = mockPosts.find(p => p.id === postId)
    if (post) {
      post.likes++
    }
    return post
  }
}