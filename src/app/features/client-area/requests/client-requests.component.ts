import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ClientDataService } from '../../../core/application/client-data.service';

@Component({ selector: 'app-client-requests', standalone: true, imports: [CommonModule], templateUrl: './client-requests.component.html', styleUrl: './client-requests.component.scss' })
export class ClientRequestsComponent {
  readonly data = inject(ClientDataService);
}

