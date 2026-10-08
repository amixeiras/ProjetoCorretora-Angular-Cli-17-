import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AdminAuthService } from '../../../core/application/admin-auth.service';
import { BrokerCatalogService } from '../../../core/application/broker-catalog.service';
import { ClientDataService } from '../../../core/application/client-data.service';

@Component({
  selector: 'app-cliente-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cliente-login.component.html',
  styleUrl: './cliente-login.component.scss'
})
export class ClienteLoginComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly auth = inject(AdminAuthService);
  private readonly clientData = inject(ClientDataService);
  private readonly router = inject(Router);
  private readonly catalog = inject(BrokerCatalogService);
  private readonly route = inject(ActivatedRoute);
  broker = this.catalog.getBySlug(this.route.snapshot.paramMap.get('route') ?? this.route.parent?.parent?.snapshot.paramMap.get('brokerSlug') ?? 'seguranca-total');

  invalidCredentials = false;
  readonly form = this.formBuilder.nonNullable.group({ email: ['joao.silva@email.com', [Validators.required, Validators.email]], password: ['123456', Validators.required] });

  submit(): void {
    const clientId = this.auth.loginClient(this.form.controls.email.value, this.form.controls.password.value, this.broker.id);
    this.invalidCredentials = clientId === null;
    if (clientId !== null) {
      this.clientData.setLoggedClient(clientId);
      this.router.navigateByUrl('/' + this.broker.slug + '/cliente');
    }
  }
}
