import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAuthService } from '../../../core/application/admin-auth.service';

@Component({ selector: 'app-admin-login', standalone: true, imports: [CommonModule, ReactiveFormsModule], templateUrl: './admin-login.component.html', styleUrl: './admin-login.component.scss' })
export class AdminLoginComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly auth = inject(AdminAuthService);
  private readonly router = inject(Router);
  invalidCredentials = false;
  readonly form = this.formBuilder.nonNullable.group({ email: ['admin@corretora.com', [Validators.required, Validators.email]], password: ['admin123', Validators.required] });

  submit(): void {
    this.invalidCredentials = !this.auth.login(this.form.controls.email.value, this.form.controls.password.value);
    if (!this.invalidCredentials) this.router.navigateByUrl('/admin/corretoras');
  }
}
