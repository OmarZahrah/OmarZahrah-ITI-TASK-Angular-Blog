import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../../../core/services/auth';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private fb = inject(FormBuilder);

  loading = false;
  errorMessage = '';

  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private authService: Auth, private router: Router) {}

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService
      .register(this.registerForm.getRawValue() as { username: string; email: string; password: string })
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/articles']);
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = error?.error?.message || 'Register failed. Please try again.';
        },
      });
  }
}
