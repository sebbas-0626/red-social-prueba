import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { PostsService } from '../../../services/posts.service';
import { User } from '../../../models/user.model';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  currentUser: User | null = null;
  userPosts: Post[] = [];
  loading = false;
  totalLikes = 0;

  constructor(
    private authService: AuthService,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadUserPosts();
  }

  loadUserPosts(): void {
    this.loading = true;
    this.postsService.getPosts().subscribe({
      next: (posts) => {
        this.userPosts = posts.filter(post => post.authorId === this.currentUser?.id);
        this.totalLikes = this.userPosts.reduce((total, post) => total + post.likes, 0);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading user posts:', error);
        this.loading = false;
      }
    });
  }

  editProfile(): void {
    // TODO: Implementar edición de perfil
    alert('Función de edición de perfil próximamente');
  }

  toggleLike(post: Post): void {
    if (post.isLiked) {
      this.postsService.unlikePost(post.id).subscribe({
        next: () => {
          post.isLiked = false;
          post.likes--;
          this.updateTotalLikes();
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
          this.updateTotalLikes();
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
          this.userPosts = this.userPosts.filter(post => post.id !== postId);
          this.updateTotalLikes();
        },
        error: (error) => {
          console.error('Error deleting post:', error);
        }
      });
    }
  }

  private updateTotalLikes(): void {
    this.totalLikes = this.userPosts.reduce((total, post) => total + post.likes, 0);
  }
}
