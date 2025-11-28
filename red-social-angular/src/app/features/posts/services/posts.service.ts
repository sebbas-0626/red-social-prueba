import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, CreatePostRequest, LikePostRequest } from '../../../core/models/post.model';
import { environment } from '../../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class PostsService {
	private readonly API_URL = environment.postsServiceUrl;

	constructor(private http: HttpClient) { }

	// This method is used to get all posts
	getPosts(): Observable<Post[]> {
		return this.http.get<Post[]>(this.API_URL);
	}

	// This method is used to get a single post by ID
	createPost(postData: CreatePostRequest): Observable<Post> {
		return this.http.post<Post>(this.API_URL, postData);
	}
	// This method is used to update a post
	deletePost(postId: string): Observable<{ message: string }> {
		return this.http.delete<{ message: string }>(`${this.API_URL}/${postId}`);
	}

	// This method is used to like a post
	likePost(postId: string): Observable<{ message: string }> {
		return this.http.post<{ message: string }>(`${this.API_URL}/${postId}/like`, {});
	}
	// This method is used to unlike a post
	unlikePost(postId: string): Observable<{ message: string }> {
		return this.http.delete<{ message: string }>(`${this.API_URL}/${postId}/like`);
	}
	//Get all posts from a specific user
	getUserPosts(userId: number): Observable<Post[]> {
		return this.http.get<Post[]>(`${this.API_URL}/user/${userId}`);
	}
}
