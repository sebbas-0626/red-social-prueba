import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, CreatePostRequest, LikePostRequest } from '../models/post.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private readonly API_URL = environment.postsServiceUrl;

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.API_URL);
  }

  createPost(postData: CreatePostRequest): Observable<Post> {
    return this.http.post<Post>(this.API_URL, postData);
  }

  likePost(postId: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.API_URL}/${postId}/like`, {});
  }

  unlikePost(postId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.API_URL}/${postId}/like`);
  }

  deletePost(postId: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.API_URL}/${postId}`);
  }
}
