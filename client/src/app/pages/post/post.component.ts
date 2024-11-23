import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { PostService, Post_Interface } from './post.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [MatGridListModule, MatCardModule, CommonModule, ReactiveFormsModule],  // Import ReactiveFormsModule here
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PostComponent implements OnInit {
  posts: Post_Interface[] = [];
  postForm: FormGroup;
  editingPost: Post_Interface | null = null;

  constructor(
    private postService: PostService,
    private fb: FormBuilder
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.postService.getAllPosts().subscribe({
      next: (data) => {
        this.posts = data;
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
      }
    });
  }

  createPost() {
    if (this.postForm.valid) {
      const newPost: Post_Interface = {
        id: 0,
        title: this.postForm.value.title,
        content: this.postForm.value.content
      };

      this.postService.createPost(newPost).subscribe({
        next: (createdPost) => {
          this.posts.push(createdPost);
          this.resetForm();
        },
        error: (error) => {
          console.error('Error creating post:', error);
        }
      });
    }
  }

  updatePost() {
    if (this.postForm.valid && this.editingPost) {
      const updatedPost: Post_Interface = {
        ...this.editingPost,
        title: this.postForm.value.title,
        content: this.postForm.value.content
      };

      this.postService.updatePost(updatedPost).subscribe({
        next: (updatedPostData) => {
          const index = this.posts.findIndex(post => post.id === updatedPostData.id);
          if (index !== -1) {
            this.posts[index] = updatedPostData;
          }
          this.resetForm();
        },
        error: (error) => {
          console.error('Error updating post:', error);
        }
      });
    }
  }

  edit(post: Post_Interface) {
    this.editingPost = post;
    this.postForm.setValue({
      title: post.title,
      content: post.content
    });
  }

  deletePost(postId: number) {
    this.postService.deletePost(postId).subscribe({
      next: () => {
        this.posts = this.posts.filter(post => post.id !== postId);
      },
      error: (error) => {
        console.error('Error deleting post:', error);
      }
    });
  }

  resetForm() {
    this.postForm.reset();
    this.editingPost = null;
  }
}
