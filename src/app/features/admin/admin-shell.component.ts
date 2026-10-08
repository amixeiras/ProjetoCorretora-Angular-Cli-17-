import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AdminAuthService } from '../../core/application/admin-auth.service';
import { Router } from '@angular/router';

@Component({ selector: 'app-admin-shell', standalone: true, imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet], templateUrl: './admin-shell.component.html', styleUrl: './admin-shell.component.scss' })
export class AdminShellComponent {
  private readonly auth = inject(AdminAuthService);
  private readonly router = inject(Router);
  constructor() { if (!this.auth.isAuthenticated()) this.router.navigateByUrl('/admin/login'); }
  logout(): void { this.auth.logout(); this.router.navigateByUrl('/admin/login'); }
}
