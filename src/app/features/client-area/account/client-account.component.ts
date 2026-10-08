import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ClientDataService } from '../../../core/application/client-data.service';

@Component({
  selector: 'app-client-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-account.component.html',
  styleUrl: './client-account.component.scss'
})
export class ClientAccountComponent {
  readonly client = inject(ClientDataService).getLoggedClient();
}
