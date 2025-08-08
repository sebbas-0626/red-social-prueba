export interface Post {
  id: string;
  content: string;
  authorId: string;
  userId?: number;   // 
  likesCount?: number; // 
  imageUrl?: string;
  author: {
    id: string | number; // id del autor, puede ser string o number
    username: string;
    profilePicture?: string;
  };
  likes: number;
  isLiked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePostRequest {
  content: string;
}

export interface LikePostRequest {
  postId: string;
} 