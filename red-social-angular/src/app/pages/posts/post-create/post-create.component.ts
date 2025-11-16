import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostsService } from '../../../services/posts.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent {
  postForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private postsService: PostsService,
    private router: Router
  ) {
    this.postForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(environment.maxPostLength)]],
      imageUrl: ['']
    });
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      this.postsService.createPost(this.postForm.value).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = error.error?.message || 'Error al crear el post';
        }
      });
    }
  }
}
