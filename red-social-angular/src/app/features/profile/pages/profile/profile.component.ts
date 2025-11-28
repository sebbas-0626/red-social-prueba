import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { PostsService } from '../../../posts/services/posts.service';
import { UsersService } from '../../../../core/services/users.service';
import { User } from '../../../../core/models/user.model';
import { Post } from '../../../../core/models/post.model';
import { AvatarComponent } from '../../../../shared/components/avatar/avatar.component';

@Component({
	selector: 'app-profile',
	standalone: true,
	imports: [CommonModule, RouterModule, AvatarComponent],
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
		if (this.currentUser) {
			this.loading = true;
			this.postsService.getUserPosts(Number(this.currentUser.id)).subscribe({
				next: (posts) => {
					this.userPosts = posts;
					this.totalLikes = this.userPosts.reduce((sum, post) => sum + (post.likes || 0), 0);
					this.loading = false;
				},
				error: (error) => {
					this.loading = false;
				}
			});
		}
	}

	editProfile(): void {
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
				}
			});
		}
	}

	private updateTotalLikes(): void {
		this.totalLikes = this.userPosts.reduce((sum, post) => sum + (post.likes || 0), 0);
	}
}
