import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AdminAuthService } from '../../core/application/admin-auth.service';
import { BrokerCatalogService } from '../../core/application/broker-catalog.service';
import { ClientDataService } from '../../core/application/client-data.service';
import { InsuredPerson } from '../../core/domain/insured-person';
import { ClientDetailsComponent } from './client-details/client-details.component';

@Component({
  selector: 'app-client-adm',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ClientDetailsComponent],
  templateUrl: './client-adm.component.html',
  styleUrl: './client-adm.component.scss'
})
export class ClientAdmComponent {
  private readonly auth = inject(AdminAuthService);
  private readonly brokerCatalog = inject(BrokerCatalogService);
  private readonly clientData = inject(ClientDataService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly brokers = this.brokerCatalog.list();
  readonly brokerSlug = this.route.parent?.snapshot.paramMap.get('brokerSlug') ?? 'seguranca-total';
  readonly broker = this.brokerCatalog.getBySlug(this.brokerSlug);
  readonly clients = this.clientData.listForBroker(this.broker);
  readonly pageSizeOptions = [25, 50, 100];
  pageSize = 25;
  currentPage = 1;
  searchTerm = '';
  statusFilter = 'Todos';
  selectedClient: InsuredPerson | null = null;

  constructor() { if (!this.auth.isAuthenticated()) this.router.navigateByUrl(`/${this.broker.slug}/admin/login`); }

  get filteredClients(): InsuredPerson[] {
    const search = this.searchTerm.trim().toLowerCase();
    return this.clients.filter(client => {
      const matchesSearch = !search || [client.name, client.cnpj, client.email, client.phone].some(value => value.toLowerCase().includes(search));
      const matchesStatus = this.statusFilter === 'Todos' || client.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }

  get paginatedClients(): InsuredPerson[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredClients.slice(start, start + this.pageSize);
  }

  get pageCount(): number { return Math.max(1, Math.ceil(this.filteredClients.length / this.pageSize)); }
  setPage(page: number): void { this.currentPage = Math.min(Math.max(page, 1), this.pageCount); }
  setPageSize(size: number): void { this.pageSize = size; this.currentPage = 1; }
  viewDetails(clientId: number): void { this.selectedClient = this.clientData.getInsuredById(clientId) ?? null; }
  closeDetails(): void { this.selectedClient = null; }
  logout(): void { this.auth.logout(); this.router.navigateByUrl(`/${this.broker.slug}`); }
}