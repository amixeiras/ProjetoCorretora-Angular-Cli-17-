import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AdminAuthService } from '../../../core/application/admin-auth.service';
import { BrokerCatalogService } from '../../../core/application/broker-catalog.service';

@Component({
  selector: 'app-client-adm-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './client-adm-login.component.html',
  styleUrl: './client-adm-login.component.scss'
})
export class ClientAdmLoginComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly auth = inject(AdminAuthService);
  private readonly router = inject(Router);
  private readonly catalog = inject(BrokerCatalogService);
  private readonly route = inject(ActivatedRoute);
  readonly brokerSlug = this.route.parent?.snapshot.paramMap.get('brokerSlug') ?? 'seguranca-total';
  readonly broker = this.catalog.getBySlug(this.brokerSlug);
  invalidCredentials = false;
  readonly form = this.formBuilder.nonNullable.group({ email: ['admin@corretora.com', [Validators.required, Validators.email]], password: ['admin123', Validators.required] });

  submit(): void {
    this.invalidCredentials = !this.auth.login(this.form.controls.email.value, this.form.controls.password.value);
    if (!this.invalidCredentials) this.router.navigateByUrl(`/${this.broker.slug}/admin/clientes`);
  }
}