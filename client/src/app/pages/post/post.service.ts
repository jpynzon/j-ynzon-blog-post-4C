import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Post_Interface {
  id: number;
  title: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})

export class PostService {
  private apiUrl = 'http://localhost:3000/post';

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Post_Interface[]> {
    return this.http.get<Post_Interface[]>(this.apiUrl);
  }

  createPost(post: Post_Interface): Observable<Post_Interface> {
    return this.http.post<Post_Interface>(this.apiUrl, {
      title: post.title,
      content: post.content
    });
  }

  updatePost(post: Post_Interface): Observable<Post_Interface> {
    const url = `${this.apiUrl}/${post.id}`;
    return this.http.put<Post_Interface>(url, post);
  }

  deletePost(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
