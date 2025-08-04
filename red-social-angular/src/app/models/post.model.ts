export interface Post {
  id: string;
  content: string;
  authorId: string;
  author: {
    id: string;
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