import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AdminAuthService } from '../../core/application/admin-auth.service';
import { BrokerCatalogService } from '../../core/application/broker-catalog.service';
import { ClientDataService } from '../../core/application/client-data.service';

@Component({
  selector: 'app-client-shell', standalone: true, imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './client-shell.component.html', styleUrl: './client-shell.component.scss'
})
export class ClientShellComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly auth = inject(AdminAuthService);
  private readonly brokerCatalog = inject(BrokerCatalogService);
  readonly clientData = inject(ClientDataService);
  broker = this.brokerCatalog.getBySlug(this.route.snapshot.paramMap.get('brokerSlug'));
  readonly brokerSlug = this.route.snapshot.paramMap.get('brokerSlug') ?? 'seguranca-total';
  menuOpen = false;
  profileMenuOpen = false;

  constructor() {
    this.brokerCatalog.brokerUpdated$.subscribe(broker => {
      if (broker.slug === this.brokerSlug) this.broker = broker;
    });
  }

  logout(): void {
    this.auth.logout();
    this.profileMenuOpen = false;
    this.router.navigateByUrl(`/${this.brokerSlug}`);
  }
}