import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article as ArticleModel } from '../../../../core/models/article.model';
import { ArticleService } from '../../../../core/services/article';

@Component({
  selector: 'app-editor',
  standalone: false,
  templateUrl: './editor.html',
  styleUrl: './editor.css',
})
export class Editor implements OnInit {
  private fb = inject(FormBuilder);

  loading = false;
  saving = false;
  errorMessage = '';
  isEditMode = false;
  articleId = '';
  selectedImages: File[] = [];
  private currentArticle: ArticleModel | null = null;

  editorForm = this.createForm();

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.articleId = this.route.snapshot.paramMap.get('id') || '';
    this.isEditMode = !!this.articleId;

    if (this.isEditMode) {
      this.loadArticleForEdit();
    }
  }

  onImagesChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedImages = input.files ? Array.from(input.files) : [];
  }

  onSubmit(): void {
    if (this.editorForm.invalid) {
      this.editorForm.markAllAsTouched();
      return;
    }

    if (!this.isEditMode && this.selectedImages.length === 0) {
      this.errorMessage = 'Please select at least one image.';
      return;
    }

    this.saving = true;
    this.errorMessage = '';

    const formValue = this.editorForm.getRawValue();

    if (this.isEditMode) {
      this.articleService
        .updateArticle(this.articleId, {
          title: formValue.title as string,
          content: formValue.content as string,
          group: (formValue.group as string) || undefined,
        })
        .subscribe({
          next: () => {
            this.saving = false;
            this.router.navigate(['/articles']);
          },
          error: (error) => {
            this.saving = false;
            this.errorMessage = error?.error?.message || 'Failed to update article.';
          },
        });
      return;
    }

    this.articleService
      .createArticle({
        title: formValue.title as string,
        content: formValue.content as string,
        images: this.selectedImages,
        group: (formValue.group as string) || undefined,
      })
      .subscribe({
        next: () => {
          this.saving = false;
          this.router.navigate(['/articles']);
        },
        error: (error) => {
          this.saving = false;
          this.errorMessage = error?.error?.message || 'Failed to create article.';
        },
      });
  }

  private loadArticleForEdit(): void {
    this.loading = true;
    this.errorMessage = '';

    this.articleService.getArticles().subscribe({
      next: (response) => {
        this.currentArticle = response.data.find((post) => post._id === this.articleId) || null;

        if (!this.currentArticle) {
          this.errorMessage = 'Article not found.';
          this.loading = false;
          return;
        }

        this.editorForm.patchValue({
          title: this.currentArticle.title,
          content: this.currentArticle.content,
        });
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error?.error?.message || 'Failed to load article.';
      },
    });
  }

  private createForm() {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(3)]],
      group: [''],
    });
  }
}
