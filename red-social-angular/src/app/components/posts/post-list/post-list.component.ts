import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostsService } from '../../../services/posts.service';
import { AuthService } from '../../../services/auth.service';
import { Post } from '../../../models/post.model';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  loading = false;
  currentUserId: string | null = null;

  constructor(
    private postsService: PostsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadPosts();
    this.currentUserId = this.authService.getCurrentUser()?.id || null;
  }

  loadPosts(): void {
    this.loading = true;
    this.postsService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading posts:', error);
        this.loading = false;
      }
    });
  }

  toggleLike(post: Post): void {
    if (post.isLiked) {
      this.postsService.unlikePost(post.id).subscribe({
        next: () => {
          post.isLiked = false;
          post.likes--;
        },
        error: (error) => {
          console.error('Error unliking post:', error);
        }
      });
    } else {
      this.postsService.likePost(post.id).subscribe({
        next: () => {
          post.isLiked = true;
          post.likes++;
        },
        error: (error) => {
          console.error('Error liking post:', error);
        }
      });
    }
  }

  deletePost(postId: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este post?')) {
      this.postsService.deletePost(postId).subscribe({
        next: () => {
          this.posts = this.posts.filter(post => post.id !== postId);
        },
        error: (error) => {
          console.error('Error deleting post:', error);
        }
      });
    }
  }
}
